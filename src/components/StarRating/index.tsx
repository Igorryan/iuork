import React from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface StarRatingProps {
  rating: number; // Avaliação de 0 a 5
  size?: number; // Tamanho das estrelas
  color?: string; // Cor das estrelas
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  size = 16,
  color = '#FFAA1B', // Amarelo padrão
}) => {
  const fullStars = Math.floor(rating); // Número de estrelas cheias
  const hasHalfStar = rating % 1 !== 0; // Verifica se há meia estrela
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0); // Número de estrelas vazias

  return (
    <View style={styles.container}>
      {/* Estrelas cheias */}
      {Array.from({ length: fullStars }).map((_, index) => (
        <Icon key={`full-${index}`} name="star" size={size} color={color} />
      ))}

      {/* Meia estrela */}
      {hasHalfStar && <Icon name="star-half" size={size} color={color} />}

      {/* Estrelas vazias */}
      {Array.from({ length: emptyStars }).map((_, index) => (
        <Icon key={`empty-${index}`} name="star-o" size={size} color={color} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});

export default StarRating;
