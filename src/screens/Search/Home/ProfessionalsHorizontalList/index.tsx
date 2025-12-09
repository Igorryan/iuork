import { useCallback, useEffect, useRef, useState } from 'react';
import { Dimensions, ScrollView } from 'react-native';

// styles
import * as S from './styles';

// application
import { ProfessionalCard } from '@components/ProfessionalCard';

// types
import { ProfessionalFocusedProps } from '..';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@routes/stack.routes';
import { Professional as IProfessional } from '../../../types/domain';

type Props = {
  data: IProfessional[];
  setProfessionalFocused(data: ProfessionalFocusedProps): void;
  professionalFocused: ProfessionalFocusedProps;
};

// consts
const { width } = Dimensions.get('window');
const baseCardWidth = Number((width * 0.8).toFixed(0));

// component
export const ProfessionalsHorizontalList: React.FC<Props> = ({
  data,
  professionalFocused,
  setProfessionalFocused,
}) => {
  // state
  const [position, setPosition] = useState(0);

  // refs
  const scrollViewRef = useRef<ScrollView>(null);

  // hooks
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  // callbacks
  // const scrollToProfessionalCardFocused = useCallback(
  //   (professionalId: string) => {
  //     const professionalIndex = data.findIndex(
  //       (professional) => professionalId === professional.id,
  //     );
  //     scrollViewRef.current?.scrollTo({ x: professionalIndex * cardWidth });
  //   },
  //   [data],
  // );

  const handleOpenProfessionalProfile = useCallback((professionalId: string) => {
    navigation.navigate('ProfessionalProfile', { professionalId });
  }, [navigation]);

  // computed
  const isSingle = data.length === 1;
  // account for horizontal padding of 10 on both sides when single
  const computedCardWidth = isSingle ? width - 20 : baseCardWidth;
  const cardMargin = 10; // marginRight entre os cards
  const containerPadding = 10; // paddingHorizontal do container
  const snapInterval = computedCardWidth + cardMargin; // intervalo de snap incluindo margem

  useEffect(() => {
    if (!professionalFocused?.id) return;

    const professionalFocusedIndex = data.findIndex((p) => p.id === professionalFocused.id);
    if (professionalFocusedIndex === -1) return;

    // Calcular a posição considerando o padding inicial e o intervalo de snap
    // O primeiro card já está no padding (posição 0), então não precisamos adicionar padding novamente
    const scrollX = professionalFocusedIndex * snapInterval;

    scrollViewRef.current?.scrollTo({
      x: scrollX,
      animated: true,
    });
  }, [data, professionalFocused, snapInterval]);

  useEffect(() => {
    if (!data || data.length === 0) return;
    
    // Calcular o índice baseado na posição do scroll
    // O snapInterval já considera o padding através do snapToAlignment
    const professionalIndex = Math.round(position / snapInterval);
    
    if (professionalIndex >= 0 && professionalIndex < data.length) {
      const professional = data[professionalIndex];
      if (professional?.address) {
        setProfessionalFocused({
          id: professional.id,
          location: professional.address,
        });
      }
    }
  }, [data, position, setProfessionalFocused, snapInterval]);

  // renders
  return (
    <S.ProfessionalList>
      <S.ProfessionalContainer
        style={{
          paddingHorizontal: 10,
        }}
        ref={scrollViewRef}
        horizontal
        scrollEnabled={data.length > 1}
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        snapToAlignment="start"
        snapToInterval={isSingle ? undefined : snapInterval}
        onMomentumScrollEnd={(e) => {
          const scrollX = e.nativeEvent.contentOffset.x;
          setPosition(Number(scrollX.toFixed(0)));
          
          // Garantir que o snap está alinhado corretamente
          if (!isSingle) {
            // O snapToInterval já considera o padding através do snapToAlignment="start"
            // Mas precisamos garantir que está alinhado corretamente
            const snappedIndex = Math.round(scrollX / snapInterval);
            const snappedPosition = snappedIndex * snapInterval;
            
            // Se não estiver perfeitamente alinhado (com margem de erro de 5px), ajustar
            if (Math.abs(scrollX - snappedPosition) > 5) {
              scrollViewRef.current?.scrollTo({
                x: snappedPosition,
                animated: true,
              });
            }
          }
        }}
        scrollEventThrottle={0}
        contentContainerStyle={{
          paddingRight: isSingle ? 0 : 10,
        }}
      >
        {data.map((professional) => (
          <ProfessionalCard
            style={{
              width: computedCardWidth,
              marginRight: isSingle ? 0 : 10,
            }}
            onPress={() => handleOpenProfessionalProfile(professional.id)}
            activeOpacity={0.9}
            professional={professional}
            key={professional.id}
          />
        ))}
      </S.ProfessionalContainer>
    </S.ProfessionalList>
  );
};
