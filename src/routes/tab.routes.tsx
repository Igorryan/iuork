import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import theme from '@theme/index';

import { MapScreen } from '@screens/Search/Home';
import { useRef, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { clearLastSearch } from '@functions/searchStorage';
import Favorites from '@screens/Favorites';
import Services from '@screens/Services';
import Messages from '@screens/Messages';
import Profile from '@screens/Profile';

export type RootTabParamList = {
  HomeTab: undefined;
  FavoritesTab: undefined;
  ServicesTab: undefined;
  MessagesTab: undefined;
  ProfileTab: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

// Componente separado para melhor compatibilidade com Fast Refresh
const HomeTabScreen: React.FC = () => {
  return <MapScreen />;
};

export const TabRoutes: React.FC = () => {
  const lastPressRef = useRef<number>(0);
  const [refreshKey, setRefreshKey] = useState(0);
  const insets = useSafeAreaInsets();
  const bottomPadding = Math.max(insets.bottom, 6);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: theme.COLORS.SECONDARY,
        tabBarInactiveTintColor: theme.COLORS.GREY_40,
        tabBarStyle: {
          backgroundColor: theme.COLORS.WHITE,
          borderTopColor: 'transparent',
          height: 64 + insets.bottom,
          paddingBottom: bottomPadding,
          paddingTop: 6,
        },
        tabBarLabelStyle: { fontSize: 12, marginBottom: 4 },
        tabBarIcon: ({ color }) => {
          let iconName: string = 'search-outline';
          if (route.name === 'HomeTab') iconName = 'home-outline';
          if (route.name === 'ServicesTab') iconName = 'briefcase-outline';
          if (route.name === 'MessagesTab') iconName = 'chatbubbles-outline';
          if (route.name === 'ProfileTab') iconName = 'person-outline';
          return <Ionicons name={iconName as any} size={20} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeTabScreen}
        options={{
          title: 'Início',
          tabBarButton: (props) => {
            // Criar objeto limpo apenas com propriedades necessárias e compatíveis
            const cleanProps: any = {
              style: props.style,
              accessibilityLabel: props.accessibilityLabel,
              accessibilityRole: props.accessibilityRole,
              accessibilityState: props.accessibilityState,
              testID: props.testID,
              children: props.children,
            };
            
            // Adicionar propriedades opcionais apenas se não forem null
            if (props.delayLongPress != null) cleanProps.delayLongPress = props.delayLongPress;
            if (props.disabled != null) cleanProps.disabled = props.disabled;
            if (props.onBlur != null) cleanProps.onBlur = props.onBlur;
            if (props.onFocus != null) cleanProps.onFocus = props.onFocus;
            if (props.onLongPress != null) cleanProps.onLongPress = props.onLongPress;
            if (props.onPressIn != null) cleanProps.onPressIn = props.onPressIn;
            if (props.onPressOut != null) cleanProps.onPressOut = props.onPressOut;
            
            return (
            <TouchableOpacity
                {...cleanProps}
                onPress={async (event) => {
                const now = Date.now();
                if (now - lastPressRef.current < 300) {
                  await clearLastSearch();
                  setRefreshKey((v) => v + 1);
                }
                lastPressRef.current = now;
                  props?.onPress?.(event);
              }}
            >
              {props.children}
            </TouchableOpacity>
            );
          },
        }}
      />
      <Tab.Screen name="ServicesTab" component={Services} options={{ title: 'Serviços' }} />
      <Tab.Screen name="MessagesTab" component={Messages} options={{ title: 'Chat' }} />
      <Tab.Screen name="ProfileTab" component={Profile} options={{ title: 'Perfil' }} />
    </Tab.Navigator>
  );
};


