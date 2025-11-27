// styles
import { StackNavigationProp } from '@react-navigation/stack';
import * as S from './styles';

// libs
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';

// application
import { getUserAddress } from '@functions/getUserAddress';
import { getLastSearch } from '@functions/searchStorage';

// consts

// types
import { RootStackParamList } from '@routes/stack.routes';

export const Header: React.FC = () => {
  // hooks
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [addressText, setAddressText] = useState<string>('Rua Ovidio Joaquim de Souza, 926');
  const [keyword, setKeyword] = useState<string>('');

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
  useEffect(() => {
    let isMounted = true;
    (async () => {
      const [saved, lastSearch] = await Promise.all([
        getUserAddress(),
        getLastSearch(),
      ]);
      if (!isMounted) return;
      if (saved?.street) {
        const text = `${saved.street}${saved.number ? `, ${saved.number}` : ''}`;
        setAddressText(text);
      }
      if (lastSearch?.keyword) {
        setKeyword(lastSearch.keyword);
      }
    })();
    const unsubscribe = navigation.addListener('focus', async () => {
      const [saved, lastSearch] = await Promise.all([
        getUserAddress(),
        getLastSearch(),
      ]);
      if (saved?.street) {
        const text = `${saved.street}${saved.number ? `, ${saved.number}` : ''}`;
        setAddressText(text);
      }
      if (lastSearch?.keyword) {
        setKeyword(lastSearch.keyword);
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
      <S.HeaderContainer>
        <S.Header>
          <S.IconView activeOpacity={0.9} onPress={handleBack}>
            <S.IconSettings name="arrow-left" size={20} />
          </S.IconView>
          <S.SearchTextContainer activeOpacity={0.9} onPress={handleEditParamsNavigate}>
            <S.AddressText>{addressText}</S.AddressText>
            <S.DateText>{keyword || 'O que você precisa?'}</S.DateText>
          </S.SearchTextContainer>
        </S.Header>
        <S.IconView activeOpacity={0.9} onPress={handleEditParamsNavigate}>
          <S.IconSettings name="sliders" size={20} />
        </S.IconView>
      </S.HeaderContainer>
    </S.Container>
  );
};
