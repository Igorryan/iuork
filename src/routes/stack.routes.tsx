import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '@hooks/auth';
import Login from '@screens/Auth/Login';
import SignUp from '@screens/Auth/SignUp';
import { TabRoutes } from './tab.routes';

// Import das Telas na ordem solicitada
import { Home } from '@screens/Home';
import { MapScreen } from '@screens/Search/Home';
import { SearchParams } from '@screens/Search/SearchParams';
import { ProfessionalsVerticalList } from '@screens/Search/Home/ProfessionalsVerticalList';
import { ProfessionalProfile } from '@screens/Search/ProfessionalProfile';
import { ServiceDetail } from '@screens/Search/ServiceDetail';
import { ServicePhotoGallery } from '@screens/Search/ServicePhotoGallery';
import { Chat } from '@screens/Chat';

// Tipos das rotas
export type RootStackParamList = {
  Tabs: undefined;
  Home: undefined; // kept for direct navigation if needed
  Map: undefined;
  Login: undefined;
  SignUp: undefined;
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
  Chat: {
    professionalId: string;
    professionalName: string;
    professionalImage: string;
    serviceId: string;
    serviceName: string;
  };
};

// Criação do Stack Navigator
const Stack = createStackNavigator<RootStackParamList>();

// Configuração das rotas
const screens = [
  // Home and Map will live inside Tabs; keep them registered if deep linking is needed
  {
    name: 'Home',
    component: Home,
    options: { headerShown: false },
  },
  {
    name: 'SearchParams',
    component: SearchParams,
    options: { headerShown: false },
  },
  {
    name: 'Map',
    component: MapScreen,
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
  {
    name: 'Chat',
    component: Chat,
    options: { headerShown: false },
  },
];

// Componente Principal
export const StackRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={isAuthenticated ? 'Tabs' : 'Login'}>
      {isAuthenticated ? (
        <>
          <Stack.Screen name="Tabs" component={TabRoutes} />
          {screens.map((screen) => (
            <Stack.Screen
              key={screen.name}
              name={screen.name as keyof RootStackParamList}
              component={screen.component}
              options={screen.options}
            />
          ))}
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={SignUp} />
        </>
      )}
    </Stack.Navigator>
  );
};
