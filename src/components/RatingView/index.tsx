import * as S from './styles';

import { ViewProps } from 'react-native';
import { format } from 'date-fns';
import { Review as IReview } from '../../types/domain';
import StarRating from '@components/StarRating';

interface IProps extends ViewProps {
  review: IReview;
  serviceName?: string;
  showServiceName?: boolean;
}

export const RatingView: React.FC<IProps> = ({
  review,
  serviceName,
  showServiceName = false,
  ...rest
}) => {
  return (
    <S.Container {...rest}>
      <S.RatingHeader>
        <S.RatingUserImage
          source={{
            uri: review.client.image,
          }}
        />
        <S.RatingDetailsContainer>
          <S.RatingUserName>{review.client.name}</S.RatingUserName>

          <S.RatingStarContainer>
            <StarRating rating={review.rating} />
            <S.RatingCount>{review.rating}</S.RatingCount>
          </S.RatingStarContainer>
        </S.RatingDetailsContainer>
      </S.RatingHeader>

      {showServiceName && (
        <S.ServiceNameContainer style={{ alignSelf: 'flex-start' }}>
          <S.ServiceName>{serviceName}</S.ServiceName>
        </S.ServiceNameContainer>
      )}

      <S.RatingDescription>{review.description}</S.RatingDescription>

      <S.RatingFooter>
        <S.RatingDate>{format(new Date(review.createdAt), 'dd/MM/yyyy')}</S.RatingDate>
      </S.RatingFooter>
    </S.Container>
  );
};
