import 'react-native-get-random-values';
import { ThemeProvider } from 'styled-components';
import theme from './src/theme';
import AppProvider from '@hooks/index';
import { Routes } from '@routes/index';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
  Roboto_500Medium,
} from '@expo-google-fonts/roboto';

import { View } from 'react-native';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    Roboto_500Medium,
  });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider theme={theme}>
        {fontsLoaded ? (
          <AppProvider>
            <Routes />
          </AppProvider>
        ) : (
          <View />
        )}
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
