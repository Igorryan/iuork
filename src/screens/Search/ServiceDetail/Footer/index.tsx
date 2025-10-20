// styles
import { Button } from '@components/Button';
import * as S from './styles';
import { Price } from '@components/Price';

// libs
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@routes/stack.routes';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import theme from '@theme/index';

// application
import { BudgetRequestModal } from '@components/BudgetRequestModal';
import { createBudgetRequest, cancelBudget } from '@api/callbacks/budget';
import { useAuth } from '@hooks/auth';

// consts

// types

type FooterProps = {
  servicePrice: number;
  pricingType?: 'FIXED' | 'HOURLY' | 'BUDGET';
  professionalData?: {
    id: string;
    name: string;
    image: string;
  };
  serviceId?: string;
  serviceName?: string;
  serviceDescription?: string;
  hasPendingBudget?: boolean;
  budgetId?: string | null;
  budgetStatus?: 'PENDING' | 'QUOTED' | 'ACCEPTED' | 'REJECTED' | 'EXPIRED';
};

export const Footer: React.FC<FooterProps> = ({ 
  servicePrice, 
  pricingType,
  professionalData,
  serviceId,
  serviceName,
  serviceDescription,
  hasPendingBudget,
  budgetId,
  budgetStatus,
}) => {
  // hooks
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { user } = useAuth();
  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const [isCreatingRequest, setIsCreatingRequest] = useState(false);
  
  const handleBudgetPress = () => {
    if (!professionalData || !serviceId) return;
    
    // Verificar se é um serviço tipo BUDGET (orçar)
    if (pricingType === 'BUDGET' || servicePrice === 0) {
      // Se já tem orçamento pendente, vai direto para o chat
      if (hasPendingBudget && budgetId) {
        navigation.navigate('Chat', {
          professionalId: professionalData.id,
          professionalName: professionalData.name,
          professionalImage: professionalData.image,
          serviceId,
          serviceName: serviceName || '',
          budgetId: budgetId, // ✅ Passa o budgetId do orçamento pendente
        });
      } else {
        setShowBudgetModal(true);
      }
    } else {
      navigation.navigate('Chat', {
        professionalId: professionalData.id,
        professionalName: professionalData.name,
        professionalImage: professionalData.image,
        serviceId,
        serviceName: serviceName || '',
        budgetId: budgetId || undefined, // ✅ Passa budgetId se existir
      });
    }
  };

  const handleConfirmBudget = async () => {
    if (!professionalData || !serviceId || !user?.id) return;
    
    setShowBudgetModal(false);
    setIsCreatingRequest(true);
    
    try {
      // Criar solicitação de orçamento no banco de dados
      await createBudgetRequest(user.id, professionalData.id, serviceId);
      
      // Navegar para o chat
      navigation.navigate('Chat', {
        professionalId: professionalData.id,
        professionalName: professionalData.name,
        professionalImage: professionalData.image,
        serviceId,
        serviceName: serviceName || '',
        sendBudgetRequest: true, // Flag para enviar mensagem automática
      });
    } catch (error) {
      console.error('Erro ao criar solicitação de orçamento:', error);
      Alert.alert('Erro', 'Não foi possível criar a solicitação. Tente novamente.');
    } finally {
      setIsCreatingRequest(false);
    }
  };

  const handleRefreshBudget = async () => {
    if (!budgetId || !professionalData || !serviceId || !user?.id) return;

    Alert.alert(
      'Refazer Orçamento',
      'Deseja realmente cancelar o orçamento atual e solicitar um novo? Esta ação não pode ser desfeita.',
      [
        {
          text: 'Não',
          style: 'cancel',
        },
        {
          text: 'Sim, Refazer',
          style: 'destructive',
          onPress: async () => {
            setIsCreatingRequest(true);
            
            try {
              // 1. Cancelar orçamento atual
              const cancelled = await cancelBudget(budgetId);
              
              if (!cancelled) {
                throw new Error('Falha ao cancelar orçamento');
              }

              console.log('✅ Orçamento anterior cancelado:', budgetId);

              // 2. Criar novo orçamento (retorna com dados do chat)
              const newBudget = await createBudgetRequest(user.id, professionalData.id, serviceId);
              
              if (!newBudget || !newBudget.chat) {
                throw new Error('Falha ao criar novo orçamento');
              }

              console.log('✅ Novo orçamento criado:', newBudget.id);
              console.log('✅ Novo chat:', newBudget.chatId);

              // 3. Navegar para o chat do NOVO orçamento
              navigation.navigate('Chat', {
                professionalId: newBudget.chat.professionalId,
                professionalName: newBudget.chat.professional.name,
                professionalImage: newBudget.chat.professional.avatarUrl || '',
                serviceId: newBudget.serviceId,
                serviceName: newBudget.chat.service?.title || serviceName || '',
                budgetId: newBudget.id, // ✅ Passa o ID do NOVO orçamento
                sendBudgetRequest: true,
              });

              Alert.alert('Sucesso', 'Novo orçamento solicitado com sucesso!');
            } catch (error) {
              console.error('Erro ao refazer orçamento:', error);
              Alert.alert('Erro', 'Não foi possível refazer o orçamento. Tente novamente.');
            } finally {
              setIsCreatingRequest(false);
            }
          },
        },
      ]
    );
  };
  
  return (
    <>
      <BudgetRequestModal
        visible={showBudgetModal}
        onClose={() => setShowBudgetModal(false)}
        onConfirm={handleConfirmBudget}
        serviceName={serviceName || ''}
        serviceDescription={serviceDescription}
        professionalName={professionalData?.name || ''}
        professionalImage={professionalData?.image || ''}
      />
      
      <S.Container>
        <S.Footer>
          {/* Mostrar link do orçamento se houver budgetId */}
          {budgetId && (
            <S.BudgetLinkContainer>
              <S.BudgetLink onPress={() => navigation.navigate('BudgetDetail', { budgetId })}>
                <Ionicons name="document-text-outline" size={20} color={theme.COLORS.SECONDARY} />
                <S.BudgetLinkText>Ver Orçamento</S.BudgetLinkText>
              </S.BudgetLink>
              <S.RefreshBudgetButton onPress={handleRefreshBudget}>
                <Ionicons name="refresh-outline" size={16} color={theme.COLORS.GREY_60} />
                <S.RefreshBudgetText>Refazer</S.RefreshBudgetText>
              </S.RefreshBudgetButton>
            </S.BudgetLinkContainer>
          )}
          
          <S.PriceButtonContainer>
            {servicePrice !== 0 && <Price style={{ marginRight: 16 }} priceValue={servicePrice} pricingType={pricingType} />}

            {budgetStatus === 'PENDING' ? (
              <Button 
                onPress={() => navigation.navigate('Chat', {
                  professionalId: professionalData?.id || '',
                  professionalName: professionalData?.name || '',
                  professionalImage: professionalData?.image || '',
                  serviceId: serviceId || '',
                  serviceName: serviceName || '',
                  budgetId: budgetId || undefined,
                })}
                style={{ backgroundColor: '#FFA500', flex: 1 }}
              >
                Aguardando Orçamento...
              </Button>
            ) : servicePrice || budgetStatus === 'ACCEPTED' || budgetStatus === 'QUOTED' ? (
              <Button style={{ flex: 1 }}>Contratar</Button>
            ) : hasPendingBudget ? (
              <Button onPress={handleBudgetPress} style={{ backgroundColor: '#FFA500', flex: 1 }}>Aguardando...</Button>
            ) : (
              <Button onPress={handleBudgetPress} style={{ flex: 1 }}>Orçar</Button>
            )}
          </S.PriceButtonContainer>
        </S.Footer>
      </S.Container>
    </>
  );
};
