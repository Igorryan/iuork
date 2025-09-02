import { KeyboardAvoidingView, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';

export const Container = styled(KeyboardAvoidingView)`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
`;

export const ContentView = styled(View)`
  flex: 1;
  padding: 24px;
`;

export const CloseIconContainer = styled(TouchableOpacity)`
  align-self: flex-end;
  padding: 4px;
  margin-bottom: 8px;
`;

export const CloseIcon = styled(Ionicons).attrs(({ theme }) => ({
  size: 24,
  color: theme.COLORS.GREY_80,
}))``;
 