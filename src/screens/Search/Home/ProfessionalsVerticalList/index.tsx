import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';

// components
import { Header } from '@components/Header';

// api
import { getAllProfessionals } from '@api/callbacks/professional';

// types
import { Professional as IProfessional } from '../../../types/domain';

// styles
import * as S from './styles';

export const ProfessionalsVerticalList: React.FC = () => {
  const [data, setData] = useState<IProfessional[]>([]);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      const response = await getAllProfessionals();
      if (isMounted) setData(response);
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <S.Container>
      <StatusBar style="dark" />
      
      <Header />
      
      <S.ProfessionalsList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <S.ProfessionalCardCustom
            name={item.name}
            image={item.image}
            services={item.services}
            rating={item.rating}
            distance={item.distance}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </S.Container>
  );
};
