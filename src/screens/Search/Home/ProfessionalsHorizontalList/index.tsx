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
  }, []);

  // computed
  const isSingle = data.length === 1;
  // account for horizontal padding of 10 on both sides when single
  const computedCardWidth = isSingle ? width - 20 : baseCardWidth;

  useEffect(() => {
    if (!professionalFocused?.id) return;

    const professionalFocusedIndex = data.findIndex((p) => p.id === professionalFocused.id);

    scrollViewRef.current?.scrollTo({
      x: professionalFocusedIndex * computedCardWidth,
    });
  }, [data, professionalFocused, computedCardWidth]);

  useEffect(() => {
    if (!data || data.length === 0) return;
    const professionalIndex = Math.ceil(position / computedCardWidth);
    const professional = data[professionalIndex];
    if (!professional || !professional.address) return;
    setProfessionalFocused({
      id: professional.id,
      location: professional.address,
    });
  }, [data, position, setProfessionalFocused, computedCardWidth]);

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
        snapToInterval={isSingle ? undefined : computedCardWidth}
        onMomentumScrollEnd={(e) => {
          setPosition(Number(e.nativeEvent.contentOffset.x.toFixed(0)));
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
