// styles
import { useTheme } from 'styled-components/native';
import * as S from './styles';

// libs
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@routes/stack.routes';

// application

// consts
const LIMIT_PHOTO_PREVIEW = 3;

// types
import { Price } from '@components/Price';
import { Service as IService } from '../../../types/domain';
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
      <S.ServiceHeader>
        <S.ServiceTitle>{service.name}</S.ServiceTitle>

        <S.ServiceImagesContainer>
          {service.images.map(
            (image, i) =>
              i < LIMIT_PHOTO_PREVIEW && (
                <S.ServiceImage
                  key={image}
                  source={{
                    uri: image,
                  }}
                />
              ),
          )}
          {service.images.length - LIMIT_PHOTO_PREVIEW > 0 && (
            <S.MorePhotosContainer>
              <S.MorePhotos>+{service.images.length - (LIMIT_PHOTO_PREVIEW - 1)}</S.MorePhotos>
            </S.MorePhotosContainer>
          )}
        </S.ServiceImagesContainer>
      </S.ServiceHeader>

      <S.ServiceDescription>{service.description}</S.ServiceDescription>

      <S.ServiceDetails>
        <S.ServiceDetailItem>
          <StarRating rating={4.5} />
          <S.ServiceDetailDescription>4.5 (48 avaliações)</S.ServiceDetailDescription>
        </S.ServiceDetailItem>
        <S.ServiceDetailItem>
          <MaterialCommunityIcons name="clock-outline" size={16} color={COLORS.GREY_60} />
          <S.ServiceDetailDescription>30 minutos</S.ServiceDetailDescription>
        </S.ServiceDetailItem>
      </S.ServiceDetails>

      <S.ServiceDetailFooter>
        {service.price ? (
          <Price
            priceValue={service.price}
            pricingType={service.pricingType === 'HOURLY' ? 'HOURLY' : undefined}
          />
        ) : (
          <S.RequiredBudgetTextContainer>
            <S.RequiredBudgetText>Orçamento necessário</S.RequiredBudgetText>
          </S.RequiredBudgetTextContainer>
        )}
        <S.ServiceButton>
          <S.ServiceButtonText>
            {service.pricingType === 'BUDGET' || !service.price ? 'Orçar' : 'Contratar'}
          </S.ServiceButtonText>
        </S.ServiceButton>
      </S.ServiceDetailFooter>
    </S.Container>
  );
};
