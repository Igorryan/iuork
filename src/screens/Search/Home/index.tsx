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
import { api } from '@config/api';

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
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<string>('');
  const [userAvatarUrl, setUserAvatarUrl] = useState<string | null>(null);

  // Carregar última busca, profissionais e categorias
  useFocusEffect(
    React.useCallback(() => {
      let isMounted = true;
      (async () => {
        const [search, categoriesData, address] = await Promise.all([
          getLastSearch(),
          getProfessionCategories(),
          getUserAddress(),
        ]);
        
        // Se tem busca salva, carregar profissionais com filtro do backend
        if (search?.keyword && search.address) {
          const professionals = await getAllProfessionals(
            search.keyword,
            search.address,
            search.date || null
          );
          if (isMounted) {
            setAllProfessionals(professionals);
            setLastSearchState(search);
          }
        } else {
          // Sem busca, carregar todos (ou vazio)
          const professionals = await getAllProfessionals();
          if (isMounted) {
            setAllProfessionals(professionals);
            setLastSearchState(search);
          }
        }
        
        if (isMounted) {
          setCategories(categoriesData);
          if (address) {
            const parts = [];
            if (address.street) {
              parts.push(address.street);
              if (address.number) {
                parts.push(`${address.number}`);
              }
            }
            if (address.district) {
              parts.push(address.district);
            }
            if (address.city) {
              parts.push(address.city);
            }
            if (address.state) {
              parts.push(address.state);
            }
            const locationText = parts.length > 0 ? parts.join(', ') : '';
            setUserLocation(locationText);
          }
        }
      })();

      // Buscar avatar atualizado do usuário
      (async () => {
        try {
          const { data } = await api.get('/auth/me');
          if (isMounted && data?.avatarUrl) {
            setUserAvatarUrl(data.avatarUrl);
          } else if (isMounted) {
            setUserAvatarUrl(user?.avatarUrl || null);
          }
        } catch (error) {
          // Se falhar, usar o avatar do contexto
          if (isMounted) {
            setUserAvatarUrl(user?.avatarUrl || null);
          }
        }
      })();

      return () => {
        isMounted = false;
      };
    }, [user?.avatarUrl]),
  );

  // Handler para selecionar serviço/categoria
  const handleServicePress = (serviceName: string) => {
    // Navegar para SearchParams com o nome da profissão e abrir "Quando"
    navigation.navigate('SearchParams', { professionName: serviceName, openWhen: true });
  };

  // Handler para buscar
  const handleSearchPress = () => {
    navigation.navigate('SearchParams');
  };

  // Handler para selecionar categoria
  const handleCategoryPress = (categoryId: string) => {
    // Se já está selecionada, deseleciona
    if (selectedCategoryId === categoryId) {
      setSelectedCategoryId(null);
    } else {
      setSelectedCategoryId(categoryId);
    }
  };

  // Determinar se deve mostrar mapa ou categorias
  // Como o backend já filtra, usamos allProfessionals diretamente
  const filteredProfessionals = allProfessionals;
  const shouldShowMap = useMemo(() => {
    return lastSearch?.keyword && lastSearch.keyword.trim().length > 0 && filteredProfessionals.length > 0;
  }, [lastSearch, filteredProfessionals]);

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
              setAllProfessionals([]);
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
            {userAvatarUrl || user?.avatarUrl ? (
              <HomeStyles.Avatar source={{ uri: userAvatarUrl || user?.avatarUrl || '' }} resizeMode="cover" />
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
                  <HomeStyles.LocationText numberOfLines={1} ellipsizeMode="tail">{userLocation}</HomeStyles.LocationText>
                </HomeStyles.LocationContainer>
              ) : null}
            </HomeStyles.UserInfoContainer>
            <HomeStyles.HeaderActions>
              <HomeStyles.HeaderButton activeOpacity={0.7}>
                <Ionicons name="notifications-outline" size={18} color={theme.COLORS.PRIMARY} />
              </HomeStyles.HeaderButton>
            </HomeStyles.HeaderActions>
          </HomeStyles.Header>

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

          {/* Banner Promocional */}
          <HomeStyles.BannerContainer>
            <HomeStyles.BannerImage 
              source={require('../../../assets/home/banner.png')}
              resizeMode="contain"
            />
          </HomeStyles.BannerContainer>

          {/* Seção de Categorias Horizontal */}
          {categories.length > 0 && (
            <HomeStyles.CategoriesSection>
              <HomeStyles.SectionTitle>Procure por categoria</HomeStyles.SectionTitle>
              <HomeStyles.CategoriesHorizontalList 
                horizontal 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 24 }}
              >
                {categories.map((category) => {
                  const isSelected = selectedCategoryId === category.id;
                  return (
                    <HomeStyles.CategoryCard
                      key={category.id}
                      activeOpacity={0.7}
                      onPress={() => handleCategoryPress(category.id)}
                      categoryColor={category.color || theme.COLORS.SECONDARY}
                    >
                      <HomeStyles.CategoryCardIconContainer 
                        categoryColor={category.color || theme.COLORS.SECONDARY}
                        isSelected={isSelected}
                      >
                          {/* <Image 
                            source={{ uri: category.imageUrl }} 
                            style={{ width: '100%', height: '100%', borderRadius: 50 }}
                            resizeMode="cover"
                          /> */}
                          <Ionicons 
                            name={(category.icon as any) || 'briefcase'} 
                            size={24} 
                            color={theme.COLORS.WHITE} 
                          />
                      </HomeStyles.CategoryCardIconContainer>
                      <HomeStyles.CategoryCardName>{category.name}</HomeStyles.CategoryCardName>
                    </HomeStyles.CategoryCard>
                  );
                })}
              </HomeStyles.CategoriesHorizontalList>
            </HomeStyles.CategoriesSection>
          )}

          {/* Lista de Categorias com seus Serviços */}
          {(selectedCategoryId 
            ? categories.filter(cat => cat.id === selectedCategoryId)
            : categories
          ).map((category) => {
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
                        {profession.imageUrl ? (
                          <HomeStyles.ServiceImageHorizontal 
                            source={{ uri: profession.imageUrl }} 
                            resizeMode="cover"
                          />
                        ) : (
                          <Ionicons name="briefcase-outline" size={40} color={category.color || theme.COLORS.SECONDARY} />
                        )}
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
