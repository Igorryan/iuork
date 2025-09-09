import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import theme from '@theme/index';

import { MapScreen } from '@screens/Search/Home';
import { useRef, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getLastSearch, clearLastSearch } from '@functions/searchStorage';
import { useFocusEffect } from '@react-navigation/native';
import { Home } from '@screens/Home';
import Favorites from '@screens/Favorites';
import Services from '@screens/Services';
import Messages from '@screens/Messages';
import Profile from '@screens/Profile';

export type RootTabParamList = {
  SearchTab: undefined;
  FavoritesTab: undefined;
  ServicesTab: undefined;
  MessagesTab: undefined;
  ProfileTab: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

const SearchTabEntry: React.FC<{ refreshKey: number }> = ({ refreshKey }) => {
  const [hasSearch, setHasSearch] = useState(false);
  useFocusEffect(
    React.useCallback(() => {
      let mounted = true;
      (async () => {
        const last = await getLastSearch();
        if (mounted) setHasSearch(!!(last && last.keyword && last.keyword.trim().length > 0));
      })();
      return () => {
        mounted = false;
      };
    }, [refreshKey])
  );
  return hasSearch ? <MapScreen /> : <Home />;
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
          if (route.name === 'FavoritesTab') iconName = 'heart-outline';
          if (route.name === 'ServicesTab') iconName = 'briefcase-outline';
          if (route.name === 'MessagesTab') iconName = 'chatbubble-ellipses-outline';
          if (route.name === 'ProfileTab') iconName = 'person-outline';
          return <Ionicons name={iconName as any} size={20} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="SearchTab"
        children={() => <SearchTabEntry refreshKey={refreshKey} />}
        options={{
          title: 'Pesquisar',
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              onPress={async () => {
                const now = Date.now();
                if (now - lastPressRef.current < 300) {
                  await clearLastSearch();
                  setRefreshKey((v) => v + 1);
                }
                lastPressRef.current = now;
                props?.onPress?.();
              }}
              onLongPress={props.onLongPress}
            >
              {props.children}
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen name="FavoritesTab" component={Favorites} options={{ title: 'Favoritos' }} />
      <Tab.Screen name="ServicesTab" component={Services} options={{ title: 'Serviços' }} />
      <Tab.Screen name="MessagesTab" component={Messages} options={{ title: 'Mensagens' }} />
      <Tab.Screen name="ProfileTab" component={Profile} options={{ title: 'Perfil' }} />
    </Tab.Navigator>
  );
};


