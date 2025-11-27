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

export const Header = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 62px;
  margin-top: 10px;
  margin-horizontal: 28px;
  padding: 0 4px;
  border-radius: 100px;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  box-shadow: 0px 4px 30px #0000001f;
`;

export const SearchProfessionIcon = styled(Ionicons)`
  color: ${({ theme }) => theme.COLORS.WHITE};
`;

export const SearchTextContainer = styled(TouchableOpacity)`
  flex: 1;
  margin-left: 24px;
  padding: 8px 0;
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

export const ActionsContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  gap: 8px;
  margin-right: 8px;
`;

export const CloseButton = styled(TouchableOpacity)`
  width: 28px;
  height: 28px;
  border-radius: 14px;
  background-color: ${({ theme }) => theme.COLORS.GREY_10};
  align-items: center;
  justify-content: center;
`;

export const CloseIcon = styled(Feather)`
  color: ${({ theme }) => theme.COLORS.GREY_80};
`;

export const IconView = styled(TouchableOpacity)`
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  margin-right: 4px;
`;

export const IconSettings = styled(Feather)`
  color: ${({ theme }) => theme.COLORS.GREY_80};
`;
