import { StatusBar, ViewProps } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import * as S from './styles';

interface IHeaderProps extends ViewProps {
  title?: string;
  icon?: 'close' | 'arrowleft';
}

export function Header({ title, icon = 'close', ...props }: IHeaderProps) {
  const { goBack, canGoBack } = useNavigation();

  return (
    <S.Container {...props}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <S.Header>
        {canGoBack() && (
          <S.CloseButton onPress={() => goBack()}>
            <S.Icon name={icon} />
          </S.CloseButton>
        )}
        {title && <S.HeaderTitle>{title}</S.HeaderTitle>}
      </S.Header>
    </S.Container>
  );
}
