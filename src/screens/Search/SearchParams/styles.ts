import { KeyboardAvoidingView, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';

export const Container = styled(KeyboardAvoidingView)`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
`;

export const ContentView = styled(View)`
  flex: 1;
  padding: 20px;
  gap: 10px;
  position: relative;
`;

export const CloseIconContainer = styled(TouchableOpacity)`
  align-self: flex-end;
  margin-top: -10px;
  margin-bottom: 10px;
`;

export const CloseIcon = styled(Ionicons).attrs(({ theme }) => ({
  size: 30,
  color: theme.COLORS.GREY_80,
}))``;

export const BottomSafeArea = styled(View)`
  background-color: ${({ theme }) => theme.COLORS.WHITE};
`;

export const SuggestionsWrapper = styled(View)`
  z-index: 99999;
  elevation: 20;
`;
 