import { View, SafeAreaView } from 'react-native';
import styled from 'styled-components/native';

// libs

// types

// styles
export const Container = styled(SafeAreaView)``;

export const Footer = styled(View)`
  flex-direction: row;

  elevation: 2;
  shadow-color: rgba(0, 0, 0, 1);
  shadow-offset: 1px -8px;
  shadow-opacity: 0.05;
  shadow-radius: 5px;

  width: 100%;

  padding: 20px 32px;

  background-color: ${({ theme }) => theme.COLORS.WHITE};
`;
