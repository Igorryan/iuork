// styles
import * as S from './styles';

// libs
import { MaterialCommunityIcons } from '@expo/vector-icons';

// application

// consts

// types

type DetailsProps = {
  avatar: string;
  ordersCount: number;
  ratingsAvg: number;
  name: string;
  profession: string;
};

export const Details: React.FC<DetailsProps> = ({
  avatar,
  ratingsAvg,
  name,
  profession,
}) => {
  // hooks

  // refs

  // states

  // variables

  // callbacks

  // effects

  // renders
  return (
    <S.Container colors={['#EDEDED', '#F8F8F8']}>
      <S.ProfileMainContainer>
        <S.ProfileInfoContainer>
          <S.TopInfoContainer>
            <S.RatingContainer>
              <MaterialCommunityIcons name="star" size={16} color="#FFD700" />
              <S.RatingText>{4.8}</S.RatingText>
            </S.RatingContainer>
          </S.TopInfoContainer>
          <S.UserName>{name}</S.UserName>
          <S.ProfessionText>{profession}</S.ProfessionText>
          <S.ButtonMessage style={{ borderRadius: 24 }}>
            <S.ButtonMessageText>Message</S.ButtonMessageText>
          </S.ButtonMessage>

        </S.ProfileInfoContainer>
        <S.ProfileImageContainer>
          <S.UserAvatar
            source={{
              uri: avatar,
            }}
          />
        </S.ProfileImageContainer>
      </S.ProfileMainContainer>
    </S.Container>
  );
};
