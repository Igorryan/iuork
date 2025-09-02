import { SafeAreaView, View, ScrollView, Platform } from 'react-native';
import styled from 'styled-components/native';

// libs

// styles
export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  padding-top: ${Platform.OS === 'android' ? 30 : 0}px;
`;

export const Gallery = styled(ScrollView)`
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
`;

export const GalleryContent = styled(View)`
  flex-direction: row;
`;

export const ImagesContainer = styled(View)`
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
`;
