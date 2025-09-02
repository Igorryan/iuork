// styles
import { StackNavigationProp } from '@react-navigation/stack';
import * as S from './styles';

// libs
import { useNavigation } from '@react-navigation/native';

// application

// consts

// types
import { RootStackParamList } from '@routes/stack.routes';

export const Header: React.FC = () => {
  // hooks
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  // refs

  // states

  // callbacks

  function handleEditParamsNavigate() {
    navigation.navigate('SearchParams');
  }

  function handleBack() {
    navigation.goBack();
  }

  // effects

  // renders

  return (
    <S.Container>
      <S.HeaderContainer>
        <S.Header>
          <S.IconView activeOpacity={0.9} onPress={handleBack}>
            <S.IconSettings name="arrow-left" size={20} />
          </S.IconView>
          <S.SearchTextContainer activeOpacity={0.9} onPress={handleEditParamsNavigate}>
            <S.AddressText>Rua Ovidio Joaquim de Souza, 926</S.AddressText>
            <S.DateText>Manicure</S.DateText>
          </S.SearchTextContainer>
        </S.Header>
        <S.IconView activeOpacity={0.9} onPress={handleEditParamsNavigate}>
          <S.IconSettings name="sliders" size={20} />
        </S.IconView>
      </S.HeaderContainer>
    </S.Container>
  );
};
