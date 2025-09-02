// styles
import { TouchableOpacity, ViewProps } from 'react-native';
import * as S from './styles';

// libs

// application

// consts

// types

interface SectionProps extends ViewProps {
  title: string;
  onPress?(): void;
}

export const Section: React.FC<SectionProps> = ({ onPress, title, children }) => {
  // hooks

  // refs

  // states

  // variables

  // callbacks

  // effects

  // renders
  return (
    <S.Container>
      <TouchableOpacity onPress={onPress} activeOpacity={0.6}>
        <S.SectionTitle>{title}</S.SectionTitle>
      </TouchableOpacity>
      <S.Content>{children}</S.Content>
    </S.Container>
  );
};
