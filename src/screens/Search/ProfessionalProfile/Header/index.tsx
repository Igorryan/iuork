// styles
import * as S from './styles';

// libs
import { useNavigation } from '@react-navigation/native';

// application

// consts

// types
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@routes/stack.routes';

type HeaderProps = {
  icon?: 'arrow-left' | 'x';
};

export const Header: React.FC<HeaderProps> = ({ icon = 'x' }) => {
  // hooks
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  // refs

  // states

  // variables

  // callbacks

  // effects

  // renders
  return (
    <S.Header>
      <S.BackContainer onPress={() => navigation.goBack()}>
        <S.IconClose name={icon} size={20} />
      </S.BackContainer>

      <S.OptionsContainer>
        <S.ButtonContainer>
          <S.Icon name="share-2" size={22} />
        </S.ButtonContainer>
        <S.ButtonContainer>
          <S.Icon name="heart" size={22} />
        </S.ButtonContainer>
      </S.OptionsContainer>
    </S.Header>
  );
};
