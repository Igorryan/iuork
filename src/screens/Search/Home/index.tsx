import React, { useEffect, useState, useMemo } from 'react';

// styles
import { StatusBar } from 'expo-status-bar';
import { ScrollView, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, Ionicons } from '@expo/vector-icons';
import * as S from './styles';
import * as HomeStyles from '@screens/Home/styles';

// libs
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@routes/stack.routes';
import { useFocusEffect } from '@react-navigation/native';

// application
import { ProfessionalsHorizontalList } from './ProfessionalsHorizontalList';
import { Header } from './Header';
import { Map } from './Map';

// types
import { Professional as IProfessional } from '../../../types/domain';
import { getAllProfessionals } from '@api/callbacks/professional';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '@hooks/auth';
import { getLastSearch, setLastSearch as saveSearch } from '@functions/searchStorage';
import { getUserAddress } from '@functions/getUserAddress';
import theme from '@theme/index';
import { getProfessionCategories, type ProfessionCategory } from '@api/callbacks/profession-categories';

export type ProfessionalFocusedProps =
  | {
      id: string;
      location: {
        latitude: number;
        longitude: number;
      };
    }
  | undefined;


// component
export const MapScreen: React.FC = () => {
  // hooks
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { user } = useAuth();

  const [allProfessionals, setAllProfessionals] = useState<IProfessional[]>([]);
  const [lastSearch, setLastSearchState] = useState<{ address: any; keyword: string } | undefined>(undefined);
  const [professionalFocused, setProfessionalFocused] = useState<ProfessionalFocusedProps>();
  const [categories, setCategories] = useState<ProfessionCategory[]>([]);
  const [userLocation, setUserLocation] = useState<string>('');

  // Carregar última busca, profissionais e categorias
  useFocusEffect(
    React.useCallback(() => {
      let isMounted = true;
      (async () => {
        const [professionals, search, categoriesData, address] = await Promise.all([
          getAllProfessionals(),
          getLastSearch(),
          getProfessionCategories(),
          getUserAddress(),
        ]);
        if (isMounted) {
          setAllProfessionals(professionals);
          setLastSearchState(search);
          setCategories(categoriesData);
          if (address) {
            const locationText = address.city && address.state 
              ? `${address.city}, ${address.state}`
              : address.city || address.state || '';
            setUserLocation(locationText);
          }
        }
      })();
      return () => {
        isMounted = false;
      };
    }, []),
  );

  // Filtrar profissionais baseado na busca
  const filteredProfessionals = useMemo(() => {
    if (!lastSearch?.keyword || lastSearch.keyword.trim().length === 0) {
      return [];
    }

    const keyword = lastSearch.keyword.toLowerCase().trim();
    return allProfessionals.filter((prof) => {
      // Buscar por profissão ou nome
      const professionMatch = prof.profession?.toLowerCase().includes(keyword);
      const nameMatch = prof.name.toLowerCase().includes(keyword);
      return professionMatch || nameMatch;
    });
  }, [allProfessionals, lastSearch]);

  // Determinar se deve mostrar mapa ou categorias
  const shouldShowMap = useMemo(() => {
    return lastSearch?.keyword && lastSearch.keyword.trim().length > 0 && filteredProfessionals.length > 0;
  }, [lastSearch, filteredProfessionals]);

  // Handler para selecionar serviço/categoria
  const handleServicePress = async (serviceName: string) => {
    try {
      const address = await getUserAddress();
      if (address) {
        await saveSearch({ address, keyword: serviceName });
        setLastSearchState({ address, keyword: serviceName });
      }
    } catch (error) {
      console.error('Erro ao salvar busca:', error);
    }
  };

  // Handler para buscar
  const handleSearchPress = () => {
    navigation.navigate('SearchParams');
  };

  // Handler para selecionar categoria
  const handleCategoryPress = async (categorySlug: string) => {
    try {
      const address = await getUserAddress();
      if (address) {
        const category = categories.find(cat => cat.slug === categorySlug);
        if (category?.professions && category.professions.length > 0) {
          await saveSearch({ address, keyword: category.professions[0].name });
          setLastSearchState({ address, keyword: category.professions[0].name });
        }
      }
    } catch (error) {
      console.error('Erro ao salvar busca:', error);
    }
  };

  // callbacks
  function handleNavigate() {
    navigation.navigate('ProfessionalsVerticalList');
  }

  // renders
  return (
    <>
      <StatusBar style="dark" translucent={!!shouldShowMap} />
      {shouldShowMap ? (
        <S.Container style={{ flex: 1 }}>
          <Header 
            onSearchCleared={() => {
              setLastSearchState(undefined);
            }}
          />
          <Map
            professionalFocused={professionalFocused}
            setProfessionalFocused={setProfessionalFocused}
            data={filteredProfessionals}
          />
          <S.FooterContainer>
            <S.ButtonMapContainer>
              <S.ButtonMap onPress={handleNavigate} activeOpacity={0.8}>
                <S.Icon size={16} name="list" />
                <S.ButtonText>Lista</S.ButtonText>
              </S.ButtonMap>
            </S.ButtonMapContainer>

            <ProfessionalsHorizontalList
              professionalFocused={professionalFocused}
              setProfessionalFocused={setProfessionalFocused}
              data={filteredProfessionals}
            />
          </S.FooterContainer>
        </S.Container>
      ) : (
        <SafeAreaView style={{ flex: 1 }} edges={['top']}>
          <S.Container>
            <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
          {/* Header */}
          <HomeStyles.Header>
            {user?.avatarUrl ? (
              <HomeStyles.Avatar source={{ uri: user.avatarUrl }} />
            ) : (
              <HomeStyles.AvatarPlaceholder>
                <Ionicons name="person" size={24} color="#9AA0A6" />
              </HomeStyles.AvatarPlaceholder>
            )}
            <HomeStyles.UserInfoContainer>
              <HomeStyles.UserName>{user?.name || 'Visitante'}</HomeStyles.UserName>
              {userLocation ? (
                <HomeStyles.LocationContainer>
                  <Ionicons name="location" size={14} color={theme.COLORS.SECONDARY} />
                  <HomeStyles.LocationText>{userLocation}</HomeStyles.LocationText>
                </HomeStyles.LocationContainer>
              ) : null}
            </HomeStyles.UserInfoContainer>
            <HomeStyles.HeaderActions>
              <HomeStyles.HeaderButton activeOpacity={0.7} onPress={handleSearchPress}>
                <Feather name="search" size={18} color={theme.COLORS.PRIMARY} />
              </HomeStyles.HeaderButton>
              <HomeStyles.HeaderButton activeOpacity={0.7}>
                <Ionicons name="notifications-outline" size={18} color={theme.COLORS.PRIMARY} />
              </HomeStyles.HeaderButton>
            </HomeStyles.HeaderActions>
          </HomeStyles.Header>

          {/* Banner Promocional */}
          <HomeStyles.BannerContainer>
            <HomeStyles.BannerImage 
              source={require('../../../assets/home/banner.png')}
              resizeMode="cover"
            />
          </HomeStyles.BannerContainer>

          {/* Seção de Categorias Horizontal */}
          {categories.length > 0 && (
            <HomeStyles.CategoriesSection>
              <HomeStyles.SectionTitle>Selecione a Categoria</HomeStyles.SectionTitle>
              <HomeStyles.CategoriesHorizontalList 
                horizontal 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 24 }}
              >
                {categories.map((category) => (
                  <HomeStyles.CategoryCard
                    key={category.id}
                    activeOpacity={0.7}
                    onPress={() => handleCategoryPress(category.slug)}
                    categoryColor={category.color || theme.COLORS.SECONDARY}
                  >
                    <HomeStyles.CategoryCardIconContainer categoryColor={category.color || theme.COLORS.SECONDARY}>
                      {category.imageUrl ? (
                        <Image 
                          source={{ uri: category.imageUrl }} 
                          style={{ width: 24, height: 24, borderRadius: 12 }}
                          resizeMode="cover"
                        />
                      ) : (
                        <Ionicons 
                          name={(category.icon as any) || 'briefcase'} 
                          size={24} 
                          color={category.color || theme.COLORS.SECONDARY} 
                        />
                      )}
                    </HomeStyles.CategoryCardIconContainer>
                    <HomeStyles.CategoryCardName>{category.name}</HomeStyles.CategoryCardName>
                  </HomeStyles.CategoryCard>
                ))}
              </HomeStyles.CategoriesHorizontalList>
            </HomeStyles.CategoriesSection>
          )}

          {/* Barra de Busca */}
          <HomeStyles.SearchRow>
            <HomeStyles.SearchBox activeOpacity={0.8} onPress={handleSearchPress}>
              <Feather name="search" size={18} color="#9AA0A6" />
              <HomeStyles.SearchPlaceholder>Buscar profissionais...</HomeStyles.SearchPlaceholder>
            </HomeStyles.SearchBox>
            <HomeStyles.FilterButton activeOpacity={0.8} onPress={handleSearchPress}>
              <Feather name="sliders" size={18} color="#fff" />
            </HomeStyles.FilterButton>
          </HomeStyles.SearchRow>

          {/* Lista de Categorias com seus Serviços */}
          {categories.map((category) => {
            const professions = category.professions || [];

            return (
              <HomeStyles.CategorySection key={category.id}>
                <HomeStyles.CategorySectionHeader>
                  <HomeStyles.CategorySectionIconContainer categoryColor={category.color || theme.COLORS.SECONDARY}>
                    {category.imageUrl ? (
                      <Image 
                        source={{ uri: category.imageUrl }} 
                        style={{ width: 20, height: 20, borderRadius: 10 }}
                        resizeMode="cover"
                      />
                    ) : (
                      <Ionicons name={(category.icon as any) || 'briefcase'} size={20} color={category.color || theme.COLORS.SECONDARY} />
                    )}
                  </HomeStyles.CategorySectionIconContainer>
                  <HomeStyles.CategorySectionTitle>{category.name}</HomeStyles.CategorySectionTitle>
                </HomeStyles.CategorySectionHeader>
                
                <HomeStyles.ServicesHorizontalList horizontal showsHorizontalScrollIndicator={false}>
                  {professions.map((profession) => (
                    <HomeStyles.ServiceCardHorizontal
                      key={profession.id}
                      activeOpacity={0.7}
                      onPress={() => handleServicePress(profession.name)}
                      categoryColor={category.color || theme.COLORS.SECONDARY}
                    >
                      <HomeStyles.ServiceIconContainerHorizontal categoryColor={category.color || theme.COLORS.SECONDARY}>
                        <Ionicons name="briefcase-outline" size={18} color={category.color || theme.COLORS.SECONDARY} />
                      </HomeStyles.ServiceIconContainerHorizontal>
                      <HomeStyles.ServiceNameHorizontal numberOfLines={2}>{profession.name}</HomeStyles.ServiceNameHorizontal>
                    </HomeStyles.ServiceCardHorizontal>
                  ))}
                </HomeStyles.ServicesHorizontalList>
              </HomeStyles.CategorySection>
            );
            })}
            </ScrollView>
          </S.Container>
        </SafeAreaView>
      )}
    </>
  );
};
