import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Import das Telas na ordem solicitada
import { Home } from '@screens/Search/Home';
import { SearchParams } from '@screens/Search/SearchParams';
import { ProfessionalsVerticalList } from '@screens/Search/Home/ProfessionalsVerticalList';
import { ProfessionalProfile } from '@screens/Search/ProfessionalProfile';
import { ServiceDetail } from '@screens/Search/ServiceDetail';
import { ServicePhotoGallery } from '@screens/Search/ServicePhotoGallery';
// import { Chat } from '@screens/Search/Chat';
import { getUserAddress } from '@functions/getUserAddress';

// Tipos das rotas
export type RootStackParamList = {
  Home: undefined;
  SearchParams: { openMinimized?: boolean } | undefined;
  ProfessionalsVerticalList: undefined;
  ProfessionalProfile: { professionalId: string };
  ServiceDetail: {
    serviceId: string;
    professionalData: {
      name: string;
      image: string;
    };
  };
  ServicePhotoGallery: { images: string[] };
  // Chat: undefined;
};

// Criação do Stack Navigator
const Stack = createStackNavigator<RootStackParamList>();

// Configuração das rotas
const screens = [
  {
    name: 'SearchParams',
    component: SearchParams,
    options: { headerShown: false },
  },
  {
    name: 'Home',
    component: Home,
    options: { headerShown: false },
  },
  {
    name: 'ProfessionalsVerticalList',
    component: ProfessionalsVerticalList,
    options: { headerShown: false },
  },
  {
    name: 'ProfessionalProfile',
    component: ProfessionalProfile,
    options: { headerShown: false },
  },
  {
    name: 'ServiceDetail',
    component: ServiceDetail,
    options: { headerShown: false },
  },
  {
    name: 'ServicePhotoGallery',
    component: ServicePhotoGallery,
    options: { headerShown: false },
  },
  // {
  //   name: 'Chat',
  //   component: Chat,
  //   options: { headerShown: false },
  // },
];

// Componente Principal
export const StackRoutes: React.FC = () => {
  const [isLoadingInitialRoute, setIsLoadingInitialRoute] = useState(true);
  const [initialRouteName, setInitialRouteName] = useState<keyof RootStackParamList>('Home');

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const address = await getUserAddress();
        if (isMounted) {
          setInitialRouteName(address ? 'Home' : 'SearchParams');
        }
      } finally {
        if (isMounted) setIsLoadingInitialRoute(false);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  if (isLoadingInitialRoute) {
    return null;
  }

  return (
    <Stack.Navigator initialRouteName={initialRouteName}>
      {screens.map((screen) => (
        <Stack.Screen
          key={screen.name}
          name={screen.name as keyof RootStackParamList}
          component={screen.component}
          options={screen.options}
        />
      ))}
    </Stack.Navigator>
  );
};
