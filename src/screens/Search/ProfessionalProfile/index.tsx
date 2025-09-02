import { useEffect, useState } from 'react';

// styles
import * as S from './styles';

// libs
import { RouteProp, useRoute } from '@react-navigation/native';

// application
import { getProfessional } from '@api/callbacks/professional';
import { getServicesByProfessional } from '@api/callbacks/service';
import { getReviewsByProfessional } from '@api/callbacks/review';

import { RatingView } from '@components/RatingView';
import { ContextSwitcher } from '@components/ContextSwitcher';

import { Service } from './Service';

// consts

// types
import { Header } from './Header';
import { Details } from './Details';
import { Professional as IProfessional, Service as IService, Review as IReview } from '../../../types/domain';
import { RootStackParamList } from '@routes/stack.routes';

type ScreenRoute = RouteProp<RootStackParamList, 'ProfessionalProfile'>;

export const ProfessionalProfile: React.FC = () => {
  // hooks
  const route = useRoute<ScreenRoute>();

  // refs

  // states
  const [professional, setProfessional] = useState<IProfessional>();
  const [services, setServices] = useState<IService[]>([]);
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [optionsMenuContext, setOptionsMenuContext] = useState(['Serviços', 'Avaliações']);
  const [optionMenuContextSelected, setOptionMenuContextSelected] = useState(optionsMenuContext[0]);

  // variables
  useEffect(() => {
    let isMounted = true;
    (async () => {
      const [pro, svc, rev] = await Promise.all([
        getProfessional({ professionalId: route.params.professionalId }),
        getServicesByProfessional({ professionalId: route.params.professionalId }),
        getReviewsByProfessional({ professionalId: route.params.professionalId }),
      ]);

      if (!isMounted) return;
      if (pro) setProfessional(pro);
      if (svc) setServices(svc);
      if (rev) setReviews(rev);
    })();
    return () => {
      isMounted = false;
    };
  }, [route.params.professionalId]);

  // useMemo(() => {
  //   const response = getRatingsByProfessionalId({
  //     professionalId: route.params.professionalId,
  //   });

  //   if (!response) return;

  //   setReviews(response);
  // }, [route.params.professionalId]);

  // callbacks

  // effects

  // renders
  return (
    <S.Container>
      <S.Content>
        {professional && (
          <>
            <Header />

            <S.ScrollViewContainer showsVerticalScrollIndicator={false}>
              <Details
                avatar={professional.image}
                ordersCount={professional.completedServicesCount}
                ratingsAvg={professional.ratingsAggregate.avg}
                ratingsCount={professional.ratingsAggregate.count}
                name={professional.name}
                profession={professional.profession}
                description={professional.description}
              />

              <S.HeaderOptionsContainer>
                <ContextSwitcher
                  optionSelected={optionMenuContextSelected}
                  options={optionsMenuContext}
                  setOptionSelected={setOptionMenuContextSelected}
                />
              </S.HeaderOptionsContainer>

              {optionMenuContextSelected === optionsMenuContext[0] ? (
                <S.ServiceContainer>
                  {services.map((service) => (
                    <Service
                      service={service}
                      key={service.id}
                      professionalData={{ name: professional.name, image: professional.image }}
                    />
                  ))}
                </S.ServiceContainer>
              ) : (
                <S.RatingContainer>
                  {reviews &&
                    reviews.map((review) => (
                      <RatingView
                        showServiceName
                        style={{ marginBottom: 20 }}
                        review={review}
                        key={review.id}
                      />
                    ))}
                </S.RatingContainer>
              )}
            </S.ScrollViewContainer>
          </>
        )}
      </S.Content>
    </S.Container>
  );
};
