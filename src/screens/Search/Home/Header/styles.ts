import { SafeAreaView, View, Text, TouchableOpacity, Platform } from 'react-native';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';

// libs
import { Feather } from '@expo/vector-icons';

// types

// styles
export const Container = styled(SafeAreaView)`
  z-index: 1;
  padding-top: ${Platform.OS === 'android' ? 25 : 0}px;
`;

export const HeaderContainer = styled(TouchableOpacity)`
  width: 100%;

  padding: 0 28px;
`;

export const Header = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 62px;

  margin-top: 10px;

  border-radius: 100px;

  background-color: ${({ theme }) => theme.COLORS.WHITE};
  box-shadow: 0px 4px 30px #0000001f;
`;

export const SearchProfessionIcon = styled(Ionicons)`
  color: ${({ theme }) => theme.COLORS.WHITE};
`;

export const SearchTextContainer = styled(View)`
  margin-left: 28px;
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

export const IconView = styled(View)`
  margin-right: 24px;
`;

export const IconSettings = styled(Feather)`
  color: ${({ theme }) => theme.COLORS.GREY_80};
`;
