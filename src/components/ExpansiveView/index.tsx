import { ViewProps } from 'react-native';
import * as S from './styles';

type ExpansiveViewProps = {
  isActive: boolean;
  onPress(): void;
  minimized: {
    title: string;
    value: string;
  };
  maximized: {
    title: string;
  };
} & ViewProps;

export const ExpansiveView: React.FC<ExpansiveViewProps> = ({
  isActive,
  onPress,
  minimized,
  maximized,
  children,
}) => {
  return (
    <S.ExpansiveView isActive={isActive}>
      <S.BlockMinimized onPress={onPress} isActive={!isActive}>
        <S.BlockMinimizedTitle>{minimized.title}</S.BlockMinimizedTitle>
        <S.BlockMinimizedValue>{minimized.value}</S.BlockMinimizedValue>
      </S.BlockMinimized>

      <S.BlockMaximized isActive={isActive}>
        <S.BlockMaximizedTitle>{maximized.title}</S.BlockMaximizedTitle>

        {children}
      </S.BlockMaximized>
    </S.ExpansiveView>
  );
};
