import { SafeAreaView, ScrollView, View } from 'react-native';
import styled from 'styled-components/native';

// libs

// types

// styles
export const Container = styled(View)`
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
`;

export const ProfessionalList = styled(SafeAreaView)`
  width: 100%;
  height: 130px;
  margin-bottom: 10px;
`;

export const ProfessionalContainer = styled(ScrollView)`
  width: 100%;
  height: 100%;

  flex-direction: row;

  margin-top: 10px;
`;
