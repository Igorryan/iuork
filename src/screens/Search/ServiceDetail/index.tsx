import { useEffect, useState } from 'react';

// styles
import * as S from './styles';

// libs
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@routes/stack.routes';
import { Alert } from 'react-native';

// application
import { RatingView } from '@components/RatingView';
import { useAuth } from '@hooks/auth';
import { getAcceptedBudget, getPendingBudget, getBudgetWithPrice, Budget, createBudgetRequest } from '@api/callbacks/budget';

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
import { useSocket } from '@hooks/useSocket';

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
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { user } = useAuth();
  const socket = useSocket();

  // refs

  // states
  const [service, setService] = useState<IService>();
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [acceptedBudgetPrice, setAcceptedBudgetPrice] = useState<number | null>(null);
  const [hasPendingBudget, setHasPendingBudget] = useState(false);
  const [currentBudget, setCurrentBudget] = useState<Budget | null>(null);

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

  // Entrar na sala do cliente para receber notificações
  useEffect(() => {
    if (socket && user?.id) {
      console.log('🔌 [SERVICE_DETAIL] Entrando na sala do cliente:', user.id);
      socket.emit('join-client', user.id);
    }
  }, [socket, user?.id]);

  // Ouvir atualizações de orçamentos via WebSocket
  useEffect(() => {
    if (socket && user?.id) {
      const handleNewBudget = (data: any) => {
        console.log('🔔 [SERVICE_DETAIL] Novo orçamento recebido!', data);
        
        // Verificar se é para este serviço
        if (data.serviceId === route.params.serviceId) {
          const price = parseFloat(data.price);
          
          // Se o preço foi definido (> 0), atualizar
          if (price > 0) {
            setAcceptedBudgetPrice(price);
            setHasPendingBudget(false);
            setCurrentBudget(data);
            console.log('✅ [SERVICE_DETAIL] Preço atualizado: R$', price);
          }
        }
      };

      socket.on('new-budget', handleNewBudget);

      return () => {
        socket.off('new-budget', handleNewBudget);
      };
    }
  }, [socket, user?.id, route.params.serviceId]);

  // Buscar orçamento aceito para este serviço e cliente
  useEffect(() => {
    let isMounted = true;
    (async () => {
      if (!user?.id) return;
      
      const [acceptedBudget, pendingBudget, budgetWithPrice] = await Promise.all([
        getAcceptedBudget(route.params.serviceId, user.id),
        getPendingBudget(route.params.serviceId, user.id),
        getBudgetWithPrice(route.params.serviceId, user.id),
      ]);
      
      if (acceptedBudget && isMounted) {
        setAcceptedBudgetPrice(parseFloat(acceptedBudget.price));
        setCurrentBudget(acceptedBudget);
        console.log('✅ [SERVICE_DETAIL] Orçamento aceito encontrado:', acceptedBudget.id);
      } else if (budgetWithPrice && isMounted) {
        // Se tem orçamento com preço definido mas ainda pendente
        setAcceptedBudgetPrice(parseFloat(budgetWithPrice.price));
        setCurrentBudget(budgetWithPrice);
        console.log('✅ [SERVICE_DETAIL] Orçamento com preço encontrado:', budgetWithPrice.id);
      } else if (pendingBudget && isMounted) {
        // Se tem orçamento pendente (aguardando profissional definir preço)
        setHasPendingBudget(true);
        setCurrentBudget(pendingBudget);
        console.log('✅ [SERVICE_DETAIL] Orçamento pendente encontrado:', pendingBudget.id);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, [route.params.serviceId, user?.id]);

  // callbacks
  const handleRequestNewBudget = async () => {
    if (!user?.id || !route.params.professionalData?.id || !route.params.serviceId) {
      Alert.alert('Erro', 'Informações insuficientes para solicitar orçamento.');
      return;
    }

    Alert.alert(
      'Solicitar Novo Orçamento',
      'Deseja realmente solicitar um novo orçamento? Isso substituirá o orçamento atual.',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Confirmar',
          onPress: async () => {
            try {
              // Criar nova solicitação de orçamento
              await createBudgetRequest(
                user.id,
                route.params.professionalData.id,
                route.params.serviceId
              );

              // Navegar para o chat
              navigation.navigate('Chat', {
                professionalId: route.params.professionalData.id,
                professionalName: route.params.professionalData.name,
                professionalImage: route.params.professionalData.image,
                serviceId: route.params.serviceId,
                serviceName: service?.name || '',
                sendBudgetRequest: true,
              });
            } catch (error) {
              console.error('Erro ao criar nova solicitação de orçamento:', error);
              Alert.alert('Erro', 'Não foi possível criar a solicitação. Tente novamente.');
            }
          },
        },
      ]
    );
  };

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
        servicePrice={acceptedBudgetPrice !== null ? acceptedBudgetPrice : (service?.price || 0)}
        pricingType={service?.pricingType}
        professionalData={route.params.professionalData}
        serviceId={route.params.serviceId}
        serviceName={service?.name || ''}
        serviceDescription={service?.description || ''}
        hasPendingBudget={hasPendingBudget}
        budgetId={currentBudget?.id || null}
        budgetStatus={currentBudget?.status}
      />
    </S.Container>
  );
};
