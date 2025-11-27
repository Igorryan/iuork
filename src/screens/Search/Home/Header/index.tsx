// styles
import { StackNavigationProp } from '@react-navigation/stack';
import * as S from './styles';

// libs
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';

// application
import { getUserAddress } from '@functions/getUserAddress';
import { getLastSearch, clearLastSearch } from '@functions/searchStorage';

// consts

// types
import { RootStackParamList } from '@routes/stack.routes';

type HeaderProps = {
  onSearchCleared?: () => void;
};

export const Header: React.FC<HeaderProps> = ({ onSearchCleared }) => {
  // hooks
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [addressText, setAddressText] = useState<string>('');
  const [keyword, setKeyword] = useState<string>('');

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

  async function handleClearSearch() {
    try {
      await clearLastSearch();
      setKeyword('');
      // Chama callback para atualizar o estado no MapScreen
      if (onSearchCleared) {
        onSearchCleared();
      }
    } catch (error) {
      console.error('Erro ao limpar busca:', error);
    }
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
      } else {
        setAddressText('Definir endereço');
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
      <S.Header>
        <S.SearchTextContainer activeOpacity={0.9} onPress={handleEditParamsNavigate}>
          <S.AddressText>{addressText || 'Definir endereço'}</S.AddressText>
          <S.DateText>{keyword || 'O que você precisa?'}</S.DateText>
        </S.SearchTextContainer>
        <S.ActionsContainer>
          {keyword ? (
            <S.CloseButton onPress={handleClearSearch} activeOpacity={0.7}>
              <S.CloseIcon name="x" size={18} />
            </S.CloseButton>
          ) : null}
          <S.IconView activeOpacity={0.9} onPress={handleEditParamsNavigate}>
            <S.IconSettings name="sliders" size={20} />
          </S.IconView>
        </S.ActionsContainer>
      </S.Header>
    </S.Container>
  );
};
 