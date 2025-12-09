import { useEffect, useState, useCallback } from 'react';

// styles
import * as S from './styles';

// libs
import { RouteProp, useRoute, useNavigation, useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@routes/stack.routes';
import { Alert, StatusBar, Platform, View, StyleSheet } from 'react-native';
import { useSafeAreaInsets, SafeAreaView } from 'react-native-safe-area-context';

// application
import { RatingView } from '@components/RatingView';
import { useAuth } from '@hooks/auth';
import { getAcceptedBudget, getPendingBudget, getBudgetWithPrice, Budget, createBudgetRequest } from '@api/callbacks/budget';
import { BudgetRequestModal } from '@components/BudgetRequestModal';
import { ScheduleBookingModal } from '@components/ScheduleBookingModal';
import { createBooking } from '@api/callbacks/booking';
import { getUserAddress } from '@functions/getUserAddress';

// consts

// types
import { Header } from './Header';
import { Details } from './Details';
import { PhotosCarousel } from './PhotosCarousel';
import { Section } from './Section';
import { Footer } from './Footer';
import { Review as IReview, Service as IService } from '../../../types/domain';
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
  const insets = useSafeAreaInsets();

  // refs

  // states
  const [service, setService] = useState<IService>();
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [acceptedBudgetPrice, setAcceptedBudgetPrice] = useState<number | null>(null);
  const [hasPendingBudget, setHasPendingBudget] = useState(false);
  const [currentBudget, setCurrentBudget] = useState<Budget | null>(null);
  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);

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
      socket.emit('join-client', user.id);
    }
  }, [socket, user?.id]);

  // Função para carregar orçamentos
  const loadBudgets = useCallback(async () => {
    if (!user?.id) return;
    
    const [acceptedBudget, pendingBudget, budgetWithPrice] = await Promise.all([
      getAcceptedBudget(route.params.serviceId, user.id),
      getPendingBudget(route.params.serviceId, user.id),
      getBudgetWithPrice(route.params.serviceId, user.id),
    ]);
    
    if (acceptedBudget) {
      setAcceptedBudgetPrice(parseFloat(acceptedBudget.price));
      setCurrentBudget(acceptedBudget);
      setHasPendingBudget(false);
    } else if (budgetWithPrice) {
      // Se tem orçamento com preço definido mas ainda pendente
      setAcceptedBudgetPrice(parseFloat(budgetWithPrice.price));
      setCurrentBudget(budgetWithPrice);
      setHasPendingBudget(false);
    } else if (pendingBudget) {
      // Se tem orçamento pendente (aguardando profissional definir preço)
      setAcceptedBudgetPrice(null);
      setHasPendingBudget(true);
      setCurrentBudget(pendingBudget);
    } else {
      // Não há orçamento
      setAcceptedBudgetPrice(null);
      setHasPendingBudget(false);
      setCurrentBudget(null);
    }
  }, [route.params.serviceId, user?.id]);

  // Ouvir atualizações de orçamentos via WebSocket
  useEffect(() => {
    if (socket && user?.id) {
      const handleNewBudget = (data: any) => {
        // Verificar se é para este serviço
        if (data.serviceId === route.params.serviceId) {
          // Recarregar orçamentos para garantir que o status está atualizado
          loadBudgets();
        }
      };

      socket.on('new-budget', handleNewBudget);

      return () => {
        socket.off('new-budget', handleNewBudget);
      };
    }
  }, [socket, user?.id, route.params.serviceId, loadBudgets]);

  // Buscar orçamento aceito para este serviço e cliente
  useEffect(() => {
    loadBudgets();
  }, [loadBudgets]);

  // Recarregar orçamentos quando a tela recebe foco
  useFocusEffect(
    useCallback(() => {
      loadBudgets();
    }, [loadBudgets])
  );

  // callbacks
  const handleConfirmBudget = async () => {
    if (!route.params.professionalData || !route.params.serviceId || !user?.id) return;

    setShowBudgetModal(false);

    try {
      // Criar solicitação de orçamento no banco de dados
      await createBudgetRequest(user.id, route.params.professionalData.id, route.params.serviceId);

      // Navegar para o chat
      navigation.navigate('Chat', {
        professionalId: route.params.professionalData.id,
        professionalName: route.params.professionalData.name,
        professionalImage: route.params.professionalData.image,
        serviceId: route.params.serviceId,
        serviceName: service?.name || '',
        sendBudgetRequest: true, // Flag para enviar mensagem automática
      });
    } catch (error) {
      console.error('Erro ao criar solicitação de orçamento:', error);
      Alert.alert('Erro', 'Não foi possível criar a solicitação. Tente novamente.');
    }
  };

  const handleScheduleBooking = async (selectedDate: Date, selectedTime: string) => {
    if (!user?.id || !route.params.professionalData || !route.params.serviceId) {
      Alert.alert('Erro', 'Informações insuficientes para agendar.');
      return;
    }

    setShowScheduleModal(false);

    try {
      // Buscar endereço do usuário
      const userAddress = await getUserAddress();

      // Criar agendamento
      await createBooking({
        professionalId: route.params.professionalData.id,
        serviceId: route.params.serviceId,
        scheduledAt: selectedDate,
        latitude: userAddress?.latitude,
        longitude: userAddress?.longitude,
        address: userAddress 
          ? `${userAddress.street}, ${userAddress.number} - ${userAddress.district}, ${userAddress.city}`
          : undefined,
      });

      Alert.alert(
        'Solicitação Enviada!',
        `Sua solicitação de agendamento para ${selectedDate.toLocaleDateString('pt-BR')} às ${selectedTime} foi enviada ao profissional. Você será notificado quando ele aceitar ou recusar.`,
        [
          {
            text: 'OK',
            onPress: () => {
              // Recarregar dados ou navegar
              loadBudgets();
            },
          },
        ]
      );
    } catch (error: any) {
      console.error('Erro ao criar agendamento:', error);
      Alert.alert('Erro', error.message || 'Não foi possível criar o agendamento. Tente novamente.');
    }
  };

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
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }} edges={(!service?.images || service.images.length === 0) ? ['bottom'] : ['top', 'bottom']}>
      <StatusBar barStyle="dark-content" translucent={false} />
      {service && (
        <>
          {service.images && service.images.length > 0 && (
            <S.HeaderFixed style={{ paddingTop: insets.top }}>
              <Header
                name={route.params.professionalData.name}
                image={route.params.professionalData.image}
                overlay={true}
              />
            </S.HeaderFixed>
          )}
          
          {(!service.images || service.images.length === 0) && (
            <S.HeaderWithSafeArea style={{ paddingTop: insets.top }}>
              <Header
                name={route.params.professionalData.name}
                image={route.params.professionalData.image}
                overlay={false}
              />
            </S.HeaderWithSafeArea>
          )}

          <S.Content hasCarousel={!!(service.images && service.images.length > 0)}>
            {service.images && service.images.length > 0 && (
              <S.CarouselWrapper >
                <PhotosCarousel serviceImages={service.images} />
              </S.CarouselWrapper>
            )}

            <S.Header hasCarousel={!!(service.images && service.images.length > 0)}>
              <Details 
                name={service.name} 
                description={service.description}
                hasCarousel={!!(service.images && service.images.length > 0)}
              />
            </S.Header>

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
        currentBudget={currentBudget}
        onRequestBudget={() => setShowBudgetModal(true)}
        onContract={() => setShowScheduleModal(true)}
      />
      
      <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
        <BudgetRequestModal
          visible={showBudgetModal}
          onClose={() => setShowBudgetModal(false)}
          onConfirm={handleConfirmBudget}
          serviceName={service?.name || ''}
          serviceDescription={service?.description || ''}
          professionalName={route.params.professionalData.name}
          professionalImage={route.params.professionalData.image}
        />

        <ScheduleBookingModal
          visible={showScheduleModal}
          onClose={() => setShowScheduleModal(false)}
          onConfirm={handleScheduleBooking}
          professionalId={route.params.professionalData.id}
        />
      </View>
    </SafeAreaView>
  );
};
