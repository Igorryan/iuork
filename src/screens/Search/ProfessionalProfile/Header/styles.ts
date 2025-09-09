import { View, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

// libs
import { Feather } from '@expo/vector-icons';

// types

// styles
export const Header = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  background-color: transparent;
  padding: 0 20px;
`;

export const BackContainer = styled(TouchableOpacity)`
  align-items: center;
  justify-content: center;

  width: 48px;
  height: 48px;

  border-width: 1px;
  border-color: ${({ theme }) => theme.COLORS.GREY_20};

  border-radius: 100px;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
`;


export const ButtonContainer = styled(TouchableOpacity)`
  align-items: center;
  justify-content: center;

  width: 48px;
  height: 48px;
`;

export const OptionsContainer = styled(View)`
  flex-direction: row;
  margin-right: -12px;
`;

export const IconClose = styled(Feather)`
  color: ${({ theme }) => theme.COLORS.GREY};
`;

export const Icon = styled(Feather)`
  color: ${({ theme }) => theme.COLORS.GREY};
`;
