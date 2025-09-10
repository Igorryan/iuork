// styles
import { useTheme } from 'styled-components/native';
import * as S from './styles';

// libs
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@routes/stack.routes';

// application

// types
import { Service as IService } from '../../../../types/domain';
import StarRating from '@components/StarRating';

interface IProps {
  service: IService;
  professionalData: {
    name: string;
    image: string;
  };
}

export const Service: React.FC<IProps> = ({ service, professionalData }) => {
  // hooks

  const { COLORS } = useTheme();

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  // refs

  // states

  // variables

  // callbacks

  // effects

  // renders
  return (
    <S.Container
      activeOpacity={0.9}
      onPress={() =>
        navigation.navigate('ServiceDetail', {
          serviceId: service.id,
          professionalData,
        })
      }
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
                <S.Row>
                  <S.ThumbOverlayIcon name="image" size={12} />
                  <S.ThumbOverlayText>+{service.images.length - 1}</S.ThumbOverlayText>
                </S.Row>
              </S.ThumbOverlay>
            )}
          </S.ThumbWrapper>
        ) : (
          <S.PlaceholderThumb />
        )}

        <S.ContentColumn>
          <S.ServiceTitle numberOfLines={2}>{service.name}</S.ServiceTitle>
          <S.MetaRow>
            <StarRating rating={4.5} size={12} />
            <S.MetaText>4.5 (48)</S.MetaText>
            <S.Dot />
            <MaterialCommunityIcons name="clock-outline" size={12} color={COLORS.GREY_60} />
            <S.MetaText>30 min</S.MetaText>
          </S.MetaRow>
          {!!service.description && (
            <S.ServiceDescription numberOfLines={2}>
              {service.description}
            </S.ServiceDescription>
          )}
        </S.ContentColumn>

        <S.RightColumn>
          {service.price ? (
            <S.PricePill>
              <S.PriceText>
                R$ {service.price}
                {service.pricingType === 'HOURLY' ? '/h' : ''}
              </S.PriceText>
            </S.PricePill>
          ) : (
            <S.BudgetBadge>
              <S.BudgetBadgeText>Orçar</S.BudgetBadgeText>
            </S.BudgetBadge>
          )}
        </S.RightColumn>
      </S.CardContent>
    </S.Container>
  );
};
