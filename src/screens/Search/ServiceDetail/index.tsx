import { useEffect, useState } from 'react';

// styles
import * as S from './styles';

// libs
import { RouteProp, useRoute } from '@react-navigation/native';

// application
import { RatingView } from '@components/RatingView';

// consts

// types
import { Header } from './Header';
import { Details } from './Details';
import { PhotosGrid } from './PhotosGrid';
import { Section } from './Section';
import { Footer } from './Footer';
import { Review as IReview, Service as IService } from '@types/domain';
import { getReviewsFromService } from '@api/callbacks/review';
import { getServiceFromId } from '@api/callbacks/service';

type ServiceDetailRouteParamList = {
  Detail: {
    serviceId: string;
    professionalData: {
      id: string; // userId do profissional
      name: string;
      image: string;
    };
  };
};

export type IPhotoDisplayType = 'carousel' | 'grid' | 'film';

export const ServiceDetail: React.FC = () => {
  // hooks
  const route = useRoute<RouteProp<ServiceDetailRouteParamList, 'Detail'>>();

  // refs

  // states
  const [service, setService] = useState<IService>();
  const [reviews, setReviews] = useState<IReview[]>([]);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      const response = await getServiceFromId({
        serviceId: route.params.serviceId,
      });
      if (!response) return;
      if (isMounted) setService(response);
    })();
    return () => {
      isMounted = false;
    };
  }, [route.params.serviceId]);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      const response = await getReviewsFromService({
        serviceId: route.params.serviceId,
      });
      if (!response) return;
      if (isMounted) setReviews(response);
    })();
    return () => {
      isMounted = false;
    };
  }, [route.params.serviceId]);

  // callbacks

  // effects

  // renders
  return (
    <S.Container>
      {service && (
        <>
          <Header
            name={route.params.professionalData.name}
            image={route.params.professionalData.image}
          />

          <S.Content>
            <S.Header>
              <Details name={service.name} description={service.description} />
            </S.Header>

            <S.Divider />

            <PhotosGrid serviceImages={service.images} />
            <S.Divider />

            {reviews.length > 0 && (
              <Section title={`Avaliações (${reviews.length})`}>
                <S.Assessments>
                  {reviews.map((review) => (
                    <RatingView key={review.id} review={review} serviceName={service.name} />
                  ))}
                </S.Assessments>

                <S.ViewMore>
                  <S.ViewMoreText>{'Mostrar mais'}</S.ViewMoreText>
                </S.ViewMore>
              </Section>
            )}

            <S.Divider />
          </S.Content>
        </>
      )}

      <Footer 
        servicePrice={service?.price || 0} 
        pricingType={service?.pricingType}
        professionalData={route.params.professionalData}
        serviceId={route.params.serviceId}
        serviceName={service?.name || ''}
      />
    </S.Container>
  );
};
