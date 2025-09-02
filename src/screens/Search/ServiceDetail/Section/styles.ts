import { View, Text } from 'react-native';
import styled from 'styled-components/native';

// libs

// types

// styles
export const Container = styled(View)``;

export const SectionTitle = styled(Text)`
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  font-size: ${({ theme }) => theme.FONT_SIZE.LG}px;
  color: ${({ theme }) => theme.COLORS.GREY};

  padding: 32px 20px;
`;

export const Content = styled(View)``;
