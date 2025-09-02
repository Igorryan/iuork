import { useEffect, useState } from 'react';

// styles
import { StatusBar } from 'expo-status-bar';
import * as S from './styles';

// libs
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@routes/stack.routes';

// application
import { ProfessionalsHorizontalList } from './ProfessionalsHorizontalList';
import { Header } from './Header';
import { Map } from './Map';

// types

// types
import { Professional as IProfessional } from '../../types/domain';
import { getAllProfessionals } from '@api/callbacks/professional';
import { useNavigation } from '@react-navigation/native';

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
export const Home: React.FC = () => {
  // hooks

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const [data, setData] = useState<IProfessional[]>([]);

  // states
  const [professionalFocused, setProfessionalFocused] = useState<ProfessionalFocusedProps>();

  // effects
  useEffect(() => {
    let isMounted = true;
    (async () => {
      const response = await getAllProfessionals();
      if (isMounted) setData(response);
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  // callbacks
  function handleNavigate() {
    navigation.navigate('ProfessionalsVerticalList');
  }

  // renders
  return (
    <S.Container>
      <StatusBar style="dark" />

      <Header />

      <Map
        professionalFocused={professionalFocused}
        setProfessionalFocused={setProfessionalFocused}
        data={data}
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
          data={data}
        />
      </S.FooterContainer>
    </S.Container>
  );
};
