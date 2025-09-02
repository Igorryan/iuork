import { Text, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';

// libs
import { Feather } from '@expo/vector-icons';

// types

// styles
export const Container = styled(View)`
  flex: 1;

  justify-content: space-between;
`;

export const FooterContainer = styled(View)`
  align-items: center;
  justify-content: center;
`;

export const ButtonMapContainer = styled(View)`
  align-items: center;
`;

export const ButtonMap = styled(TouchableOpacity)`
  align-items: center;
  justify-content: center;
  flex-direction: row;

  width: 100px;

  height: 44px;

  border-radius: 100px;

  text-align: left;

  background-color: ${({ theme }) => theme.COLORS.BLACK};
`;

export const ButtonText = styled(Text)`
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
  text-align: center;

  color: ${({ theme }) => theme.COLORS.WHITE};
`;

export const Icon = styled(Feather)`
  color: ${({ theme }) => theme.COLORS.WHITE};

  margin-right: 10px;
`;
