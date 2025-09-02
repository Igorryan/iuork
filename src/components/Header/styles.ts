import { Text, TouchableOpacity, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import styled from 'styled-components/native';

export const Container = styled.View`
  padding: 0 32px;
`;

export const Header = styled(View)`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 24px;
  margin-top: 12px;
`;

export const HeaderTitle = styled(Text)`
  font-size: ${({ theme }) => theme.FONT_SIZE.LG}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
`;
export const Icon = styled(AntDesign).attrs(() => ({
  size: 24,
}))``;

export const CloseButton = styled(TouchableOpacity)`
  position: absolute;
  left: 0;
`;
