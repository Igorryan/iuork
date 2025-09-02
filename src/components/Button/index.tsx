import { TouchableOpacityProps } from 'react-native';
import * as S from './styles';

export const Button: React.FC<TouchableOpacityProps> = ({
  children,
  activeOpacity = 0.95,
  ...rest
}) => {
  return (
    <S.Container>
      <S.Button activeOpacity={activeOpacity} {...rest}>
        <S.ButtonText>{children}</S.ButtonText>
      </S.Button>
    </S.Container>
  );
};
