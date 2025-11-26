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


// application
import { BudgetRequestModal } from '@components/BudgetRequestModal';
import { createBudgetRequest, cancelBudget, Budget } from '@api/callbacks/budget';
import { useAuth } from '@hooks/auth';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import theme from '@theme/index';

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
  currentBudget?: Budget | null;
};

export const Footer: React.FC<FooterProps> = ({
  servicePrice,
  pricingType,
  professionalData,
  serviceId,
  serviceName,
  serviceDescription,
  budgetId,
  budgetStatus,
  currentBudget,
}) => {
  // hooks
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { user } = useAuth();
  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const [isCreatingRequest, setIsCreatingRequest] = useState(false);

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

  const formatExpiryDate = (dateString: string | null) => {
    if (!dateString) return null;
    
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return 'Expirado';
    if (diffDays === 0) return 'Expira hoje';
    if (diffDays === 1) return 'Expira amanhã';
    return `Expira em ${diffDays} dias`;
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'PENDING': return 'Aguardando orçamento';
      case 'QUOTED': return 'Orçamento recebido';
      case 'ACCEPTED': return 'Aceito';
      case 'REJECTED': return 'Recusado';
      case 'EXPIRED': return 'Expirado';
      default: return status;
    }
  };

  const handleOpenChat = () => {
    if (!professionalData || !serviceId) {
      Alert.alert('Erro', 'Informações não disponíveis.');
      return;
    }

    navigation.navigate('Chat', {
      professionalId: professionalData.id,
      professionalName: professionalData.name,
      professionalImage: professionalData.image,
      serviceId: serviceId,
      serviceName: serviceName || '',
      budgetId: currentBudget?.id || budgetId || undefined,
    });
  };

  const handleViewAcceptedBudget = () => {
    if (!professionalData || !budgetId) {
      Alert.alert('Erro', 'Informações não disponíveis.');
      return;
    }

    navigation.navigate('Chat', {
      professionalId: professionalData.id,
      professionalName: professionalData.name,
      professionalImage: professionalData.image,
      serviceId: serviceId || '',
      serviceName: serviceName || '',
      budgetId: budgetId,
    });
  };

  // Determinar qual footer mostrar baseado no status do orçamento
  // QUOTED e ACCEPTED devem mostrar a view de orçamento finalizado
  const hasAcceptedBudget = (budgetStatus === 'ACCEPTED' || budgetStatus === 'QUOTED') && budgetId && currentBudget && parseFloat(currentBudget.price) > 0;
  const hasPendingBudget = budgetStatus === 'PENDING' && budgetId && currentBudget;
  const hasOtherBudgetStatus = budgetStatus && budgetStatus !== 'ACCEPTED' && budgetStatus !== 'QUOTED' && budgetStatus !== 'PENDING';

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

      <S.Footer>
        {/* Status: ACCEPTED - Orçamento finalizado */}
        {hasAcceptedBudget && (
          <S.BudgetFinalizedContainer>
            <S.BudgetFinalizedHeader>
              <S.BudgetFinalizedIconContainer>
                <MaterialIcons name="verified-user" size={20} color={theme.COLORS.PRIMARY} />
                {/* <Ionicons name="shield-checkmark-outline" size={20} color={theme.COLORS.PRIMARY} /> */}
              </S.BudgetFinalizedIconContainer>
              <S.BudgetFinalizedHeaderText>
                Orçamento finalizado e serviço pronto para você contratar.
              </S.BudgetFinalizedHeaderText>
            </S.BudgetFinalizedHeader>

            <S.BudgetFinalizedPriceCard>
              <S.BudgetFinalizedPriceLabel>Valor orçado do serviço</S.BudgetFinalizedPriceLabel>
              <S.BudgetFinalizedPrice>R$ {parseFloat(currentBudget.price).toFixed(2).replace('.', ',')}</S.BudgetFinalizedPrice>
            </S.BudgetFinalizedPriceCard>

            <S.BudgetFinalizedActions>
            <S.ContractButton onPress={() => {
                // Navegar para contratar ou executar ação de contratação
                handleViewAcceptedBudget();
              }}>
                <S.ContractButtonText>Contratar</S.ContractButtonText>
              </S.ContractButton>
              <S.ViewBudgetButton onPress={handleViewAcceptedBudget}>
                <S.ViewBudgetButtonText>Visualizar orçamento</S.ViewBudgetButtonText>
              </S.ViewBudgetButton>

            </S.BudgetFinalizedActions>
          </S.BudgetFinalizedContainer>
        )}

        {/* Status: PENDING - Orçamento pendente */}
        {hasPendingBudget && (
          <S.BudgetInfoContainer>
            <S.BudgetContent>
              {parseFloat(currentBudget.price) > 0 && (
                <S.BudgetPriceSection>
                  <S.BudgetPriceLabel>Valor Orçado</S.BudgetPriceLabel>
                  <S.BudgetPrice>R$ {parseFloat(currentBudget.price).toFixed(2).replace('.', ',')}</S.BudgetPrice>
                </S.BudgetPriceSection>
              )}

              {currentBudget.description && currentBudget.description !== 'Solicitação de orçamento' && (
                <S.BudgetDescription>
                  {currentBudget.description}
                </S.BudgetDescription>
              )}

              <S.StatusInfo>
                <S.StatusBadge status={currentBudget.status}>
                  <S.StatusText status={currentBudget.status}>
                    {getStatusText(currentBudget.status)}
                  </S.StatusText>
                </S.StatusBadge>
                {currentBudget.expiresAt && (
                  <S.BudgetExpiry>
                    <Ionicons 
                      name="time-outline" 
                      size={16} 
                      color={theme.COLORS.GREY_60} 
                    />
                    <S.BudgetExpiryText>
                      {formatExpiryDate(currentBudget.expiresAt)}
                    </S.BudgetExpiryText>
                  </S.BudgetExpiry>
                )}
              </S.StatusInfo>

              <S.InfoText>
                Um orçamento foi solicitado
              </S.InfoText>
              <S.InfoText>
                O profissional responderá em breve.
              </S.InfoText>
            </S.BudgetContent>

            <S.BudgetActions>
              <S.ChatButton onPress={handleOpenChat}>
                <S.ChatButtonText>Abrir Conversa</S.ChatButtonText>
              </S.ChatButton>
            </S.BudgetActions>
          </S.BudgetInfoContainer>
        )}

        {/* Status: Sem orçamento ou outros status - Footer padrão */}
        {!hasAcceptedBudget && !hasPendingBudget && (
          <>
            {servicePrice === 0 && (
              <S.NoPriceContainer>
                <S.NoPriceText>
                  O serviço não possui um preço, solicite o orçamento com o profissional para definir o melhor valor para sua necessidade.
                </S.NoPriceText>
              </S.NoPriceContainer>
            )}

            <S.PriceButtonContainer>
              {servicePrice !== 0 && <Price priceValue={parseFloat(servicePrice.toFixed(2).replace('.', ','))} pricingType={pricingType} />}

              {servicePrice !== 0 ? (
                <Button>Contratar</Button>
              ) : (
                <S.RequestBudgetButton onPress={() => setShowBudgetModal(true)}>
                  <S.RequestBudgetText>Solicitar orçamento</S.RequestBudgetText>
                </S.RequestBudgetButton>
              )}
            </S.PriceButtonContainer>
          </>
        )}
      </S.Footer>
    </>
  );
};
