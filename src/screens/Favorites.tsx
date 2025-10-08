import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, RefreshControl, Platform, Alert } from 'react-native';
import styled from 'styled-components/native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import { FavoriteProfessional, getFavorites, removeFavorite } from '@functions/favorites';
import { FavoriteProfessionalCard } from '@components/FavoriteProfessionalCard';
import { RootStackParamList } from '@routes/stack.routes';

const Container = styled(View)`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
  padding-top: ${Platform.OS === 'android' ? 50 : 60}px;
`;

const Header = styled(View)`
  padding: 20px;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.COLORS.GREY_20};
`;

const Title = styled(Text)`
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  font-size: ${({ theme }) => theme.FONT_SIZE.XXL}px;
  color: ${({ theme }) => theme.COLORS.GREY};
`;

const Subtitle = styled(Text)`
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
  color: ${({ theme }) => theme.COLORS.GREY_60};
  margin-top: 8px;
`;

const ContentContainer = styled(View)`
  flex: 1;
  padding: 20px;
`;

const EmptyContainer = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
`;

const EmptyIcon = styled(View)`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  background-color: ${({ theme }) => theme.COLORS.GREY_10};
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

const EmptyTitle = styled(Text)`
  font-family: ${({ theme }) => theme.FONT_FAMILY.MEDIUM};
  font-size: ${({ theme }) => theme.FONT_SIZE.LG}px;
  color: ${({ theme }) => theme.COLORS.GREY};
  text-align: center;
  margin-bottom: 8px;
`;

const EmptyText = styled(Text)`
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  color: ${({ theme }) => theme.COLORS.GREY_60};
  text-align: center;
`;

const Favorites: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [favorites, setFavorites] = useState<FavoriteProfessional[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadFavorites = async () => {
    const data = await getFavorites();
    setFavorites(data);
  };

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await loadFavorites();
    setRefreshing(false);
  };

  const handleRemoveFavorite = async (professionalId: string) => {
    Alert.alert(
      'Remover dos favoritos',
      'Deseja remover este profissional dos favoritos?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Remover',
          style: 'destructive',
          onPress: async () => {
            const success = await removeFavorite(professionalId);
            if (success) {
              await loadFavorites();
            }
          },
        },
      ]
    );
  };

  const handleProfessionalPress = (professionalId: string) => {
    navigation.navigate('ProfessionalProfile', { professionalId });
  };

  const renderEmpty = () => (
    <EmptyContainer>
      <EmptyIcon>
        <Ionicons name="bookmark-outline" size={40} color="#ABAAA9" />
      </EmptyIcon>
      <EmptyTitle>Nenhum favorito salvo</EmptyTitle>
      <EmptyText>Explore profissionais e salve seus favoritos aqui!</EmptyText>
    </EmptyContainer>
  );

  return (
    <Container>
      <Header>
        <Title>Favoritos</Title>
        <Subtitle>
          {favorites.length > 0
            ? `${favorites.length} ${favorites.length === 1 ? 'profissional salvo' : 'profissionais salvos'}`
            : 'Nenhum profissional salvo ainda'}
        </Subtitle>
      </Header>

      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <FavoriteProfessionalCard
            professional={item}
            onPress={() => handleProfessionalPress(item.id)}
            onRemove={() => handleRemoveFavorite(item.id)}
          />
        )}
        contentContainerStyle={{
          padding: 20,
          flexGrow: 1,
        }}
        ListEmptyComponent={renderEmpty}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </Container>
  );
};

export default Favorites;


