// styles
import { StackNavigationProp } from '@react-navigation/stack';
import * as S from './styles';

// libs
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';

// application
import { getUserAddress } from '@functions/getUserAddress';

// consts

// types
import { RootStackParamList } from '@routes/stack.routes';

export const Header: React.FC = () => {
  // hooks
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [addressText, setAddressText] = useState<string>('');

  // refs

  // states

  // callbacks

  async function handleEditParamsNavigate() {
    try {
      const saved = await getUserAddress();
      if (saved?.street) {
        navigation.navigate('SearchParams', { openMinimized: true });
      } else {
        navigation.navigate('SearchParams');
      }
    } catch {
      navigation.navigate('SearchParams');
    }
  }

  // effects
  useEffect(() => {
    let isMounted = true;
    (async () => {
      const saved = await getUserAddress();
      if (!isMounted) return;
      if (saved?.street) {
        const text = `${saved.street}${saved.number ? `, ${saved.number}` : ''}`;
        setAddressText(text);
      } else {
        setAddressText('Definir endereço');
      }
    })();
    const unsubscribe = navigation.addListener('focus', async () => {
      const saved = await getUserAddress();
      if (saved?.street) {
        const text = `${saved.street}${saved.number ? `, ${saved.number}` : ''}`;
        setAddressText(text);
      }
    });
    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, [navigation]);

  // renders

  return (
    <S.Container>
      <S.HeaderContainer activeOpacity={0.9} onPress={handleEditParamsNavigate}>
        <S.Header>
          <S.SearchTextContainer>
            <S.AddressText>{addressText || 'Definir endereço'}</S.AddressText>
            <S.DateText>Manicure</S.DateText>
          </S.SearchTextContainer>
          <S.IconView>
            <S.IconSettings name="sliders" size={20} />
          </S.IconView>
        </S.Header>
      </S.HeaderContainer>
    </S.Container>
  );
};
 