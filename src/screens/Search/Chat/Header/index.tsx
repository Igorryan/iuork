// styles
import * as S from './styles';

// libs
import { useNavigation } from '@react-navigation/native';

import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@routes/stack.routes';

// application

// consts

// types
type HeaderProps = {
  name: string;
  image: string;
};

export const Header: React.FC<HeaderProps> = ({ name, image }) => {
  // hooks
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  // refs

  // states

  // variables

  // callbacks

  // effects

  // renders
  return (
    <S.Container activeOpacity={0.9} onPress={() => navigation.goBack()}>
      <S.BackIcon name="arrow-left" size={24} />

      <S.ProfessionalNameText>{name}</S.ProfessionalNameText>

      <S.ProfessionalAvatar
        source={{
          uri: image,
        }}
      />
    </S.Container>
  );
};
