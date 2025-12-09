import React, { useState, useMemo } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@routes/stack.routes';

// components
import { Header } from './Header';

// api
import { getAllProfessionals } from '@api/callbacks/professional';

// types
import { Professional as IProfessional } from '../../../../types/domain';

// functions
import { getLastSearch } from '@functions/searchStorage';

// styles
import * as S from './styles';

export const ProfessionalsVerticalList: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [allProfessionals, setAllProfessionals] = useState<IProfessional[]>([]);
  const [lastSearch, setLastSearch] = useState<{ address: any; keyword: string } | undefined>(undefined);

  // Carregar profissionais e última busca
  useFocusEffect(
    React.useCallback(() => {
      let isMounted = true;
      (async () => {
        const search = await getLastSearch();
        
        // Se tem busca salva, carregar profissionais com filtro do backend
        if (search?.keyword && search.address) {
          const professionals = await getAllProfessionals(
            search.keyword,
            search.address,
            search.date || null
          );
          if (isMounted) {
            setAllProfessionals(professionals);
            setLastSearch(search);
          }
        } else {
          // Sem busca, carregar vazio
          if (isMounted) {
            setAllProfessionals([]);
            setLastSearch(search);
          }
        }
      })();
      return () => {
        isMounted = false;
      };
    }, []),
  );

  // Recarregar profissionais quando uma nova busca for feita
  React.useEffect(() => {
    if (lastSearch?.keyword && lastSearch.keyword.trim().length > 0 && lastSearch.address) {
      (async () => {
        try {
          const professionals = await getAllProfessionals(
            lastSearch.keyword,
            lastSearch.address,
            lastSearch.date || null
          );
          setAllProfessionals(professionals);
        } catch (error) {
          console.error('Erro ao recarregar profissionais:', error);
        }
      })();
    }
  }, [lastSearch?.keyword, lastSearch?.address?.latitude, lastSearch?.address?.longitude, lastSearch?.date]);

  // Como o backend já filtra, usar allProfessionals diretamente
  const filteredProfessionals = allProfessionals;

  return (
    <S.Container>
      <StatusBar style="dark" />
      
      <Header />
      
      <S.ProfessionalsList
        data={filteredProfessionals}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <S.ProfessionalCardCustom 
            professional={item} 
            onPress={() => navigation.navigate('SearchParams', { professionName: item.profession, openWhen: true })}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </S.Container>
  );
};
