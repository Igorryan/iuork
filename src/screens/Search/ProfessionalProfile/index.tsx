import { useEffect, useState, useRef } from 'react';
import { Animated, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';

// styles
import * as S from './styles';

// libs
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';

// application
import { getProfessional } from '@api/callbacks/professional';
import { getServicesByProfessional } from '@api/callbacks/service';
import { getReviewsByProfessional } from '@api/callbacks/review';
import { isFavorite, toggleFavorite } from '@functions/favorites';

import { RatingView } from '@components/RatingView';

import { Service } from './Service';

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
                  professionalData={{ name: professional.name, image: professional.image }}
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
