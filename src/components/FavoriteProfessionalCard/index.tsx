import { TouchableOpacityProps } from 'react-native';
import * as S from './styles';

import { Ionicons } from '@expo/vector-icons';
import { FavoriteProfessional } from '@functions/favorites';

type Props = TouchableOpacityProps & {
  professional: FavoriteProfessional;
  onRemove: () => void;
};

export const FavoriteProfessionalCard: React.FC<Props> = ({ professional, onRemove, ...props }) => {
  return (
    <S.Container {...props}>
      <S.Picture
        source={{
          uri: professional.image,
        }}
      />
      <S.ProfessionalInfoContainer>
        <S.NameAndActionsContainer>
          <S.Name numberOfLines={1}>{professional.name}</S.Name>
          <S.RemoveButton onPress={onRemove}>
            <Ionicons name="trash-outline" size={18} color="#FF7D7D" />
          </S.RemoveButton>
        </S.NameAndActionsContainer>

        <S.Type>{professional.profession}</S.Type>

        <S.Description numberOfLines={2}>{professional.description}</S.Description>

        <S.RatingsContainer>
          <Ionicons name="star" size={14} color="#FFAA1B" />
          <S.Rating>{professional.ratingsAggregate.avg.toFixed(1)}</S.Rating>
          <S.RatingCount> ({professional.ratingsAggregate.count})</S.RatingCount>
        </S.RatingsContainer>
      </S.ProfessionalInfoContainer>
    </S.Container>
  );
};

