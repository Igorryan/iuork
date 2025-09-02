import { SafeAreaView, View, ScrollView, Platform } from 'react-native';
import styled from 'styled-components/native';

// libs

// types

// styles
export const Container = styled(View)`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  padding-top: ${Platform.OS === 'android' ? 35 : 0}px;
`;

export const Content = styled(SafeAreaView)`
  flex: 1;
`;

export const ScrollViewContainer = styled(ScrollView)`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
`;

export const HeaderOptionsContainer = styled(View)`
  padding: 0 32px 20px 32px;

  background-color: ${({ theme }) => theme.COLORS.WHITE};
`;

export const ServiceContainer = styled(View)`
  padding: 20px 20px 80px;

  flex: 1;
`;

export const RatingContainer = styled(View)`
  padding: 16px 20px 80px;
`;
