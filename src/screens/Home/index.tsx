import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Image, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as S from './styles';
import { useAuth } from '@hooks/auth';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@routes/stack.routes';

export const Home: React.FC = () => {
  const { user } = useAuth();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  return (
    <S.Container>
      <StatusBar style="dark" />

      <S.Header>
        <S.GreetingContainer>
          <S.Title>Ei, {user?.name?.split(' ')[0] || 'visitante'}</S.Title>
          <S.Subtitle>Bem vindo ao iUorks</S.Subtitle>
        </S.GreetingContainer>
        <S.Avatar source={{ uri: 'https://i.pravatar.cc/100?img=5' }} />
      </S.Header>

      <S.SearchRow>
        <S.SearchBox activeOpacity={0.8} onPress={() => navigation.navigate('SearchParams')}>
          <Feather name="search" size={18} color="#9AA0A6" />
          <S.SearchPlaceholder>Search</S.SearchPlaceholder>
        </S.SearchBox>
        <S.FilterButton activeOpacity={0.8}>
          <Feather name="sliders" size={18} color="#fff" />
        </S.FilterButton>
      </S.SearchRow>

      <S.SectionTitle>Select your next trip</S.SectionTitle>

      <S.Chips horizontal showsHorizontalScrollIndicator={false}>
        <S.Chip><S.ChipText>Asia</S.ChipText></S.Chip>
        <S.Chip><S.ChipText>Europe</S.ChipText></S.Chip>
        <S.ChipActive><S.ChipTextActive>South America</S.ChipTextActive></S.ChipActive>
        <S.Chip><S.ChipText>North America</S.ChipText></S.Chip>
      </S.Chips>

      <S.Card>
        <S.CardImage
          source={{ uri: 'https://images.unsplash.com/photo-1544989164-31dc3c645987?q=80&w=1200&auto=format&fit=crop' }}
        />
        <S.FavoriteButton activeOpacity={0.9}>
          <Feather name="heart" size={18} color="#ffffffcc" />
        </S.FavoriteButton>
        <S.CardGradient />
        <S.CardContent>
          <S.Country>Brazil</S.Country>
          <S.Place>Rio de Janeiro</S.Place>
          <S.RatingRow>
            <Feather name="star" size={14} color="#FFD166" />
            <S.RatingText>5.0</S.RatingText>
            <S.ReviewsText>143 reviews</S.ReviewsText>
          </S.RatingRow>
          <S.SeeMoreButton activeOpacity={0.9}>
            <S.SeeMoreText>See more</S.SeeMoreText>
            <S.SeeMoreIcon>
              <Feather name="arrow-right" size={18} color="#111" />
            </S.SeeMoreIcon>
          </S.SeeMoreButton>
        </S.CardContent>
      </S.Card>

      {/* Bottom bar removed in favor of Tab Navigator */}
    </S.Container>
  );
};


