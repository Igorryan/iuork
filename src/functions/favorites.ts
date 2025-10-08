import AsyncStorage from '@react-native-async-storage/async-storage';
import { Professional } from '../types/domain';

const FAVORITES_KEY = 'favorites';

export interface FavoriteProfessional {
  id: string;
  image: string;
  coverImage?: string;
  name: string;
  profession: string;
  description: string;
  ratingsAggregate: {
    avg: number;
    count: number;
  };
  savedAt: string;
}

export const getFavorites = async (): Promise<FavoriteProfessional[]> => {
  try {
    const data = await AsyncStorage.getItem(FAVORITES_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error getting favorites:', error);
    return [];
  }
};

export const isFavorite = async (professionalId: string): Promise<boolean> => {
  try {
    const favorites = await getFavorites();
    return favorites.some((fav) => fav.id === professionalId);
  } catch (error) {
    console.error('Error checking favorite:', error);
    return false;
  }
};

export const addFavorite = async (professional: Professional): Promise<boolean> => {
  try {
    const favorites = await getFavorites();
    
    // Verifica se já está nos favoritos
    if (favorites.some((fav) => fav.id === professional.id)) {
      return true;
    }

    const favorite: FavoriteProfessional = {
      id: professional.id,
      image: professional.image,
      coverImage: professional.coverImage,
      name: professional.name,
      profession: professional.profession,
      description: professional.description,
      ratingsAggregate: professional.ratingsAggregate,
      savedAt: new Date().toISOString(),
    };

    const updatedFavorites = [favorite, ...favorites];
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
    return true;
  } catch (error) {
    console.error('Error adding favorite:', error);
    return false;
  }
};

export const removeFavorite = async (professionalId: string): Promise<boolean> => {
  try {
    const favorites = await getFavorites();
    const updatedFavorites = favorites.filter((fav) => fav.id !== professionalId);
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
    return true;
  } catch (error) {
    console.error('Error removing favorite:', error);
    return false;
  }
};

export const toggleFavorite = async (professional: Professional): Promise<boolean> => {
  const isCurrentlyFavorite = await isFavorite(professional.id);
  
  if (isCurrentlyFavorite) {
    return await removeFavorite(professional.id);
  } else {
    return await addFavorite(professional);
  }
};

