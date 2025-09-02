// styles
import { StatusBar } from 'expo-status-bar';
import * as S from './styles';
import { Header } from './Header';
import { Messages } from './Messages';
import { Footer } from './Footer';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const Chat: React.FC = () => {
  const insents = useSafeAreaInsets();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
      keyboardVerticalOffset={insents.bottom - 20} // Ajusta para o SafeArea
    >
      <S.Container>
        <StatusBar style="dark" />

        <Header
          name="Jéssica França"
          image="https://images.unsplash.com/photo-1702482527875-e16d07f0d91b?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />

        <Messages />

        <Footer />
      </S.Container>
    </KeyboardAvoidingView>
  );
};
