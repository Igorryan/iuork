// styles
import * as S from './styles';

// libs

// application

// consts

// types

type DetailsProps = {
  avatar: string;
  ordersCount: number;
  ratingsAvg: number;
  ratingsCount: number;
  name: string;
  profession: string;
  description: string;
};

export const Details: React.FC<DetailsProps> = ({
  avatar,
  ordersCount,
  ratingsAvg,
  ratingsCount,
  name,
  profession,
  description,
}) => {
  // hooks

  // refs

  // states

  // variables

  // callbacks

  // effects

  // renders
  return (
    <S.Container>
      <S.StatusContainer>
        <S.UserAvatar
          source={{
            uri: avatar,
          }}
        />

        <S.StatusDetailsContainer>
          <S.StatusContentBlock>
            <S.StatusValue>{ordersCount}</S.StatusValue>
            <S.StatusDescription>Jobs</S.StatusDescription>
          </S.StatusContentBlock>

          <S.StatusContentBlock>
            <S.StatusValue>
              {ratingsAvg} ({ratingsCount})
            </S.StatusValue>
            <S.StatusDescription>Avaliação</S.StatusDescription>
          </S.StatusContentBlock>

          <S.StatusContentBlock>
            <S.StatusValue>15m</S.StatusValue>
            <S.StatusDescription>Responde</S.StatusDescription>
          </S.StatusContentBlock>
        </S.StatusDetailsContainer>
      </S.StatusContainer>

      <S.DescriptionContainer>
        <S.UserName>{name}</S.UserName>
        {!!profession && <S.ServiceCategoryProfession>{profession}</S.ServiceCategoryProfession>}
        <S.UserDescription>{description}</S.UserDescription>
      </S.DescriptionContainer>
    </S.Container>
  );
};
