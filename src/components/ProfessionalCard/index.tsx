import { TouchableOpacityProps } from 'react-native';
import * as S from './styles';

import { Ionicons } from '@expo/vector-icons';

import { formatDistance } from '@functions/formatDistance';
import { Professional as IProfessional } from '../../types/domain';

type Props = TouchableOpacityProps & {
  professional: IProfessional;
};

export const ProfessionalCard: React.FC<Props> = ({ professional, ...props }) => {
  return (
    <S.Container {...props}>
      <S.Picture
        source={{
          uri: professional.image,
        }}
      />
      <S.ProfessionalInfoContainer>
        <S.NameAndSaveIconContainer>
          <S.Name>{professional.name}</S.Name>
          <S.SaveIcon name="heart" size={16} />
        </S.NameAndSaveIconContainer>

        <S.Type>{professional.profession}</S.Type>

        <S.WobsDescription>
          <S.WobsWord>{professional.completedServicesCount} jobs</S.WobsWord> concluídos
        </S.WobsDescription>

        {!!professional.address?.distanceInMeters && (
          <S.Distance>
            {formatDistance({ meters: professional.address.distanceInMeters })}
          </S.Distance>
        )}

        <S.RatingsContainer>
          <Ionicons name="star" size={12} />
          <S.Rating>{professional.ratingsAggregate.avg}</S.Rating>
          <S.RatingCount> ({professional.ratingsAggregate.count})</S.RatingCount>
        </S.RatingsContainer>
      </S.ProfessionalInfoContainer>
    </S.Container>
  );
};
