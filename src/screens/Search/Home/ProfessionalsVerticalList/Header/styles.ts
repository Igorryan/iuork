import styled from 'styled-components/native';

// components
import { SafeAreaView, View, Text, TouchableOpacity, Platform } from 'react-native';

// libs
import { Ionicons, Feather } from '@expo/vector-icons';

// types

// styles
export const Container = styled(SafeAreaView)`
  z-index: 1;
  background-color: white;
  flex-direction: row;

  padding-top: ${Platform.OS === 'android' ? 30 : 0}px;
`;

export const HeaderContainer = styled(View)`
  width: 100%;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: ${({ theme }) => theme.COLORS.GREY_20};

  padding: 20px;
`;

export const Header = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  background-color: ${({ theme }) => theme.COLORS.WHITE};
`;

export const SearchProfessionIcon = styled(Ionicons)`
  color: ${({ theme }) => theme.COLORS.WHITE};
`;

export const SearchTextContainer = styled(TouchableOpacity)`
  margin-left: 12px;
`;

export const AddressText = styled(Text)`
  font-size: ${({ theme }) => theme.FONT_SIZE.SSM}px;
  color: ${({ theme }) => theme.COLORS.GREY};
  font-family: ${({ theme }) => theme.FONT_FAMILY.MEDIUM};
`;

export const DateText = styled(Text)`
  font-size: ${({ theme }) => theme.FONT_SIZE.SSM}px;
  color: ${({ theme }) => theme.COLORS.GREY_60};
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};

  margin-top: 4px;
`;

export const IconView = styled(TouchableOpacity)`
  padding: 10px;
`;

export const IconSettings = styled(Feather)`
  color: ${({ theme }) => theme.COLORS.GREY_80};
`;
