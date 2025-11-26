import { useEffect, useState, useRef, useCallback } from 'react';
import { Animated, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';

// styles
import * as S from './styles';

// libs
import { RouteProp, useRoute, useNavigation, useFocusEffect } from '@react-navigation/native';

// application
import { getProfessional } from '@api/callbacks/professional';
import { getServicesByProfessional } from '@api/callbacks/service';
import { getReviewsByProfessional } from '@api/callbacks/review';
import { isFavorite, toggleFavorite } from '@functions/favorites';
import { getAcceptedBudget, getPendingBudget, getBudgetWithPrice } from '@api/callbacks/budget';
import { useAuth } from '@hooks/auth';

import { RatingView } from '@components/RatingView';

import { Service } from './Service';
import { useSocket } from '@hooks/useSocket';

// consts

// types
import { Header } from './Header';
import { Details } from './Details';
import { Professional as IProfessional, Service as IService, Review as IReview } from '../../../types/domain';
import { RootStackParamList } from '@routes/stack.routes';
import { ContextSwitcher } from '@components/ContextSwitcher';
import { Ionicons } from '@expo/vector-icons';

type ScreenRoute = RouteProp<RootStackParamList, 'ProfessionalProfile'>;

export const ProfessionalProfile: React.FC = () => {
  // hooks
  const route = useRoute<ScreenRoute>();
  const navigation = useNavigation();
  const { user } = useAuth();

  // refs

  // states
  const [professional, setProfessional] = useState<IProfessional>();
  const [services, setServices] = useState<IService[]>([]);
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [optionsMenuContext, setOptionsMenuContext] = useState(['Serviços', 'Avaliações']);
  const [optionMenuContextSelected, setOptionMenuContextSelected] = useState(optionsMenuContext[0]);
  const [tabContainerWidth, setTabContainerWidth] = useState(0);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [acceptedBudgets, setAcceptedBudgets] = useState<Map<string, number>>(new Map());
  const [pendingBudgets, setPendingBudgets] = useState<Set<string>>(new Set());
  const [receivedBudgets, setReceivedBudgets] = useState<Set<string>>(new Set());
  const socket = useSocket();
  // refs
  const sliderAnimation = useRef(new Animated.Value(0)).current;

  // variables
  useEffect(() => {
    let isMounted = true;
    (async () => {
      const [pro, svc, rev, isFav] = await Promise.all([
        getProfessional({ professionalId: route.params.professionalId }),
        getServicesByProfessional({ professionalId: route.params.professionalId }),
        getReviewsByProfessional({ professionalId: route.params.professionalId }),
        isFavorite(route.params.professionalId),
      ]);

      if (!isMounted) return;
      if (pro) setProfessional(pro);
      if (svc) setServices(svc);
      if (rev) setReviews(rev);
      setIsLiked(isFav);
    })();
    return () => {
      isMounted = false;
    };
  }, [route.params.professionalId]);

  // Entrar na sala do cliente para receber notificações de orçamentos
  useEffect(() => {
    if (socket && user?.id) {
      console.log('🔌 [PROFILE] Entrando na sala do cliente:', user.id);
      socket.emit('join-client', user.id);
    }
  }, [socket, user?.id]);

  // Ouvir atualizações de orçamentos via WebSocket
  useEffect(() => {
    if (socket && user?.id) {
      const handleNewBudget = (data: any) => {
        console.log('🔔 [PROFILE] Novo orçamento recebido!', data);
        
        const serviceId = data.serviceId;
        const price = parseFloat(data.price);
        
        // Se o preço foi definido (> 0), atualizar o mapa de preços
        if (price > 0) {
          setAcceptedBudgets((prev) => {
            const updated = new Map(prev);
            updated.set(serviceId, price);
            console.log('✅ [PROFILE] Preço atualizado para serviço:', serviceId, '- R$', price);
            return updated;
          });
          
          // Marcar como orçamento recebido
          setReceivedBudgets((prev) => {
            const updated = new Set(prev);
            updated.add(serviceId);
            return updated;
          });
          
          // Remover de pendentes já que agora tem preço
          setPendingBudgets((prev) => {
            const updated = new Set(prev);
            updated.delete(serviceId);
            return updated;
          });
        }
      };

      socket.on('new-budget', handleNewBudget);

      return () => {
        socket.off('new-budget', handleNewBudget);
      };
    }
  }, [socket, user?.id]);

  // Buscar orçamentos aceitos para todos os serviços deste profissional
  const loadBudgets = useCallback(async () => {
    if (!user?.id || services.length === 0) return;

    const budgetsMap = new Map<string, number>();
    const pendingSet = new Set<string>();
    const receivedSet = new Set<string>();
    
    // Buscar orçamento aceito, pendente e com preço para cada serviço
    await Promise.all(
      services.map(async (service) => {
        const [acceptedBudget, pendingBudget, budgetWithPrice] = await Promise.all([
          getAcceptedBudget(service.id, user.id),
          getPendingBudget(service.id, user.id),
          getBudgetWithPrice(service.id, user.id),
        ]);
        
        if (acceptedBudget) {
          budgetsMap.set(service.id, parseFloat(acceptedBudget.price));
          receivedSet.add(service.id); // ACCEPTED também é um orçamento recebido
        } else if (budgetWithPrice) {
          // Se tem orçamento com preço definido (QUOTED)
          budgetsMap.set(service.id, parseFloat(budgetWithPrice.price));
          receivedSet.add(service.id); // QUOTED é um orçamento recebido
        }
        
        if (pendingBudget && !budgetWithPrice) {
          // Apenas marca como pendente se ainda não tem preço
          pendingSet.add(service.id);
        }
      })
    );
    
    setAcceptedBudgets(budgetsMap);
    setPendingBudgets(pendingSet);
    setReceivedBudgets(receivedSet);
  }, [user?.id, services]);

  // Carregar orçamentos quando services ou user mudar
  useEffect(() => {
    loadBudgets();
  }, [loadBudgets]);

  // Recarregar orçamentos quando a tela recebe foco
  useFocusEffect(
    useCallback(() => {
      console.log('🔄 [PROFILE] Tela recebeu foco - Recarregando orçamentos');
      loadBudgets();
    }, [loadBudgets])
  );

  const handleToggleFavorite = async () => {
    if (!professional) return;

    const success = await toggleFavorite(professional);
    
    if (success) {
      const newState = !isLiked;
      setIsLiked(newState);
    } else {
      Alert.alert('Erro', 'Não foi possível salvar o profissional. Tente novamente.');
    }
  };

  // callbacks
  const handleTabChange = (option: string) => {
    setOptionMenuContextSelected(option);

    const selectedIndex = optionsMenuContext.indexOf(option);
    const tabWidth = tabContainerWidth / optionsMenuContext.length;

    Animated.spring(sliderAnimation, {
      toValue: selectedIndex * tabWidth,
      useNativeDriver: false,
      tension: 100,
      friction: 8,
    }).start();

  };

  // effects
  useEffect(() => {
    if (tabContainerWidth > 0) {
      const selectedIndex = optionsMenuContext.indexOf(optionMenuContextSelected);
      const tabWidth = tabContainerWidth / optionsMenuContext.length;
      // Apenas definir o valor inicial, sem animação no primeiro render
      if (selectedIndex === 0) {
        sliderAnimation.setValue(0);
      } else {
        Animated.spring(sliderAnimation, {
          toValue: selectedIndex * tabWidth,
          useNativeDriver: false,
          tension: 100,
          friction: 8,
        }).start();
      }
    }
  }, [tabContainerWidth]);
  // renders
  return (
    <S.Container>
      <S.HeaderButtons>
        <S.BackButton onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={20} color="#000000" />
        </S.BackButton>

        <S.ButtonsGroup>
          <S.ShareButton onPress={() => console.log('Compartilhar')}>
            <Ionicons name="share-outline" size={20} color="#000000" />
          </S.ShareButton>
          <S.LikeButton isSaved={isLiked} onPress={handleToggleFavorite}>
            <Ionicons name={isLiked ? "bookmark" : "bookmark-outline"} size={20} color={isLiked ? "#FFFFFF" : "#000000"} />
            <S.LikeText isSaved={isLiked}>{isLiked ? "Salvo!" : "Salvar"}</S.LikeText>
          </S.LikeButton>
        </S.ButtonsGroup>
      </S.HeaderButtons>

      <S.CoverImage
        source={{
          uri: professional?.coverImage || professional?.image || 'https://via.placeholder.com/1200x400',
        }}
      />

      <S.AvatarContainer>


        <S.StatsContainer>
          <S.AvatarImage
            source={{
              uri: professional?.image,
            }}
          />
          <S.BlurBackground intensity={60} tint="light">
            <S.StatsContent>

              <S.StatItem>
                <S.StatValue></S.StatValue>
                <S.StatLabel></S.StatLabel>
              </S.StatItem>
              <S.StatItem>
                <S.StatValue>321</S.StatValue>
                <S.StatLabel>Clientes</S.StatLabel>
              </S.StatItem>

              <S.StatItem>
                <S.StatValue>1.309</S.StatValue>
                <S.StatLabel>Serviços</S.StatLabel>
              </S.StatItem>

              <S.StatItem>
                <S.StatValue>15 min</S.StatValue>
                <S.StatLabel>Resposta</S.StatLabel>
              </S.StatItem>
            </S.StatsContent>
          </S.BlurBackground>
        </S.StatsContainer>
      </S.AvatarContainer>

      <S.NameContainer>
        <S.Name>{professional?.name}</S.Name>
        <S.Profession>{professional?.profession}</S.Profession>
      </S.NameContainer>

      <S.DescriptionContainer>
        <S.Description numberOfLines={isDescriptionExpanded ? undefined : 3}>
          {professional?.description}
        </S.Description>
        {professional?.description && professional.description.length > 100 && (
          <S.ShowMoreButton onPress={() => setIsDescriptionExpanded(!isDescriptionExpanded)}>
            <S.ShowMoreText>{isDescriptionExpanded ? 'Ver menos' : 'Ver mais'}</S.ShowMoreText>
          </S.ShowMoreButton>
        )}
      </S.DescriptionContainer>

      {/* <StatusBar style="dark" backgroundColor="#EDEDED" />
      <S.Content>
        <Header icon="arrow-left" />
        {professional && (
          <Details
            avatar={professional.image}
            ordersCount={professional.completedServicesCount}
            ratingsAvg={professional.ratingsAggregate.avg}
            name={professional.name}
            profession={professional.profession}
          />
        )}
      </S.Content> */}



      <S.TabSeparatorContainer>
        <ContextSwitcher options={optionsMenuContext} optionSelected={optionMenuContextSelected} setOptionSelected={setOptionMenuContextSelected} />

      </S.TabSeparatorContainer>


      {professional && (
        <>
          {optionMenuContextSelected === optionsMenuContext[0] ? (
            <S.ServiceContainer>
              {services.map((service) => (
                <Service
                  service={service}
                  key={service.id}
                  professionalData={{ id: professional.userId, name: professional.name, image: professional.image }}
                  acceptedBudgetPrice={acceptedBudgets.get(service.id)}
                  hasPendingBudget={pendingBudgets.has(service.id)}
                  hasReceivedBudget={receivedBudgets.has(service.id)}
                />
              ))}
            </S.ServiceContainer>
          ) : (
            <S.RatingContainer>
              {/* Sobre o profissional */}
              <S.SectionContainer>
                <S.SectionTitle>Sobre o profissional</S.SectionTitle>
                {professional?.description ? (
                  <S.SectionText>{professional.description}</S.SectionText>
                ) : null}
              </S.SectionContainer>

              {/* Comentários e avaliações */}
              <S.SectionContainer>
                <S.SectionTitle>Comentários e avaliações</S.SectionTitle>
              </S.SectionContainer>

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
        </>
      )}
    </S.Container>
  );
};
