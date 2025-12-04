// styles
import { useTheme } from 'styled-components/native';
import * as S from './styles';

// libs
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@routes/stack.routes';

// types
import { Service as IService } from '../../../../types/domain';

interface IProps {
  service: IService;
  professionalData: {
    id: string;
    name: string;
    image: string;
  };
  acceptedBudgetPrice?: number;
  hasPendingBudget?: boolean;
  hasReceivedBudget?: boolean;
}

export const Service: React.FC<IProps> = ({ service, professionalData, acceptedBudgetPrice, hasPendingBudget, hasReceivedBudget }) => {
  // hooks

  const { COLORS } = useTheme();

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

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

    // Se já tem orçamento pendente, leva direto para o chat
    if (hasPendingBudget) {
      navigation.navigate('Chat', {
        professionalId: professionalData.id,
        professionalName: professionalData.name,
        professionalImage: professionalData.image,
        serviceId: service.id,
        serviceName: service.name,
      });
    } else {
      // Navega para a tela de detalhes do serviço
      navigation.navigate('ServiceDetail', {
        serviceId: service.id,
        professionalData,
      });
    }
  };

  // effects

  // renders
  return (
    <S.Container
      activeOpacity={0.9}
      onPress={handleServicePress}
    >
      <S.CardContent>
        <S.LeftSection>
          <S.ServiceTitle numberOfLines={2}>{service.name}</S.ServiceTitle>
          {!!service.description && (
            <S.ServiceDescription numberOfLines={2}>
              {service.description}
            </S.ServiceDescription>
          )}
          <S.BottomRow>
            {hasPendingBudget ? (
              <S.PendingBudgetButton onPress={handleBudgetPress}>
                <S.PendingBudgetText>Aguardando orçamento</S.PendingBudgetText>
              </S.PendingBudgetButton>
            ) : hasReceivedBudget && acceptedBudgetPrice ? (
              <>
                <S.PriceButton onPress={handleBudgetPress}>
                  <S.PriceText>
                    R$ {acceptedBudgetPrice.toFixed(2).replace('.', ',')}
                    {service.pricingType === 'HOURLY' ? '/h' : ''}
                  </S.PriceText>
                </S.PriceButton>
                <S.ReceivedBudgetButton onPress={handleBudgetPress}>
                  <S.ReceivedBudgetText>Orçamento recebido</S.ReceivedBudgetText>
                </S.ReceivedBudgetButton>
              </>
            ) : displayPrice ? (
              <S.PriceButton onPress={handleBudgetPress}>
                <S.PriceText>
                  R$ {displayPrice.toFixed(2).replace('.', ',')}
                  {service.pricingType === 'HOURLY' ? '/h' : ''}
                </S.PriceText>
              </S.PriceButton>
            ) : (
              <S.RequestBudgetButton onPress={handleBudgetPress}>
                <S.RequestBudgetText>Solicitar orçamento</S.RequestBudgetText>
              </S.RequestBudgetButton>
            )}
          </S.BottomRow>
        </S.LeftSection>

        <S.RightSection>
          {(service.isOnline || service.isPresential) && (
            <S.TagsContainer>
              {service.isPresential && (
                <S.Tag>
                  <S.TagText>Presencial</S.TagText>
                </S.Tag>
              )}
              {service.isOnline && (
                <S.Tag>
                  <S.TagText>Remoto</S.TagText>
                </S.Tag>
              )}
            </S.TagsContainer>
          )}
          {service.images?.[0] && (
            <S.ImageContainer>
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
            </S.ImageContainer>
          )}

        </S.RightSection>
      </S.CardContent>
    </S.Container>
  );
};
