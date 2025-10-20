// styles
import { useTheme } from 'styled-components/native';
import * as S from './styles';

// libs
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { Alert } from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@routes/stack.routes';

// application
import { BudgetRequestModal } from '@components/BudgetRequestModal';
import { createBudgetRequest } from '@api/callbacks/budget';
import { useAuth } from '@hooks/auth';

// types
import { Service as IService } from '../../../../types/domain';
import StarRating from '@components/StarRating';

interface IProps {
  service: IService;
  professionalData: {
    id: string;
    name: string;
    image: string;
  };
  acceptedBudgetPrice?: number;
  hasPendingBudget?: boolean;
}

export const Service: React.FC<IProps> = ({ service, professionalData, acceptedBudgetPrice, hasPendingBudget }) => {
  // hooks

  const { COLORS } = useTheme();

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { user } = useAuth();

  // refs

  // states
  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const [isCreatingRequest, setIsCreatingRequest] = useState(false);

  // variables
  const displayPrice = acceptedBudgetPrice ?? service.price;

  // callbacks
  const handleServicePress = () => {
    navigation.navigate('ServiceDetail', {
      serviceId: service.id,
      professionalData,
    });
  };

  const handleBudgetPress = (e: any) => {
    e.stopPropagation();
    
    // Se já tem orçamento pendente, leva direto para o chat sem modal
    if (hasPendingBudget) {
      navigation.navigate('Chat', {
        professionalId: professionalData.id,
        professionalName: professionalData.name,
        professionalImage: professionalData.image,
        serviceId: service.id,
        serviceName: service.name,
      });
    } else {
      setShowBudgetModal(true);
    }
  };

  const handleConfirmBudget = async () => {
    if (!user?.id) return;
    
    setShowBudgetModal(false);
    setIsCreatingRequest(true);
    
    try {
      // Criar solicitação de orçamento no banco de dados
      await createBudgetRequest(user.id, professionalData.id, service.id);
      
      // Navegar para o chat
      navigation.navigate('Chat', {
        professionalId: professionalData.id,
        professionalName: professionalData.name,
        professionalImage: professionalData.image,
        serviceId: service.id,
        serviceName: service.name,
        sendBudgetRequest: true,
      });
    } catch (error) {
      console.error('Erro ao criar solicitação de orçamento:', error);
      Alert.alert('Erro', 'Não foi possível criar a solicitação. Tente novamente.');
    } finally {
      setIsCreatingRequest(false);
    }
  };

  // effects

  // renders
  return (
    <>
      <BudgetRequestModal
        visible={showBudgetModal}
        onClose={() => setShowBudgetModal(false)}
        onConfirm={handleConfirmBudget}
        serviceName={service.name}
        serviceDescription={service.description || undefined}
        professionalName={professionalData.name}
        professionalImage={professionalData.image}
      />
      
      <S.Container
        activeOpacity={0.9}
        onPress={handleServicePress}
      >
      <S.CardContent>
        {service.images?.[0] ? (
          <S.ThumbWrapper>
            <S.Thumbnail
              source={{
                uri: service.images[0],
              }}
            />
            {service.images.length > 1 && (
              <S.ThumbOverlay>
                <S.ThumbOverlayIcon name="image" size={10} />
                <S.ThumbOverlayText>{service.images.length}</S.ThumbOverlayText>
              </S.ThumbOverlay>
            )}
          </S.ThumbWrapper>
        ) : (
          <S.PlaceholderThumb />
        )}

        <S.ContentColumn>
          <S.ServiceTitle numberOfLines={2}>{service.name}</S.ServiceTitle>
          <S.MetaRow>
            <StarRating rating={4.5} size={14} />
            <S.MetaText>4.5 (48)</S.MetaText>
            <S.Dot />
            <MaterialCommunityIcons name="clock-outline" size={14} color={COLORS.GREY_60} />
            <S.MetaText>30 min</S.MetaText>
          </S.MetaRow>
          {!!service.description && (
            <>
              <S.ServiceDescription numberOfLines={2}>
                {service.description}
              </S.ServiceDescription>
            </>
          )}
        </S.ContentColumn>

        <S.RightColumn>
          {displayPrice ? (
            <S.PricePill>
              <S.PriceText>
                R$ {displayPrice}
                {service.pricingType === 'HOURLY' ? '/h' : ''}
              </S.PriceText>
            </S.PricePill>
          ) : hasPendingBudget ? (
            <S.BudgetBadgeButton onPress={handleBudgetPress} style={{ backgroundColor: '#FFA500' }}>
              <S.BudgetBadgeText>Aguardando...</S.BudgetBadgeText>
            </S.BudgetBadgeButton>
          ) : (
            <S.BudgetBadgeButton onPress={handleBudgetPress}>
              <S.BudgetBadgeText>Orçar</S.BudgetBadgeText>
            </S.BudgetBadgeButton>
          )}
        </S.RightColumn>
      </S.CardContent>
    </S.Container>
    </>
  );
};
