import { View, TouchableOpacity, Text } from 'react-native';
import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';

// libs

// types

// styles
export const Container = styled(SafeAreaView).attrs({
  edges: ['bottom'],
})`
  background-color: ${({ theme }) => theme.COLORS.WHITE};
`;

export const Footer = styled(View)`
  flex-direction: column;

  elevation: 2;
  shadow-color: rgba(0, 0, 0, 1);
  shadow-offset: 1px -8px;
  shadow-opacity: 0.05;
  shadow-radius: 5px;

  width: 100%;

  padding: 16px 24px;

  background-color: ${({ theme }) => theme.COLORS.WHITE};
`;

export const BudgetLinkContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  padding: 10px 14px;
  background-color: ${({ theme }) => theme.COLORS.GREY_10};
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.COLORS.GREY_20};
`;

export const BudgetLink = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  gap: 6px;
  flex: 1;
`;

export const BudgetLinkText = styled(Text)`
  font-family: ${({ theme }) => theme.FONT_FAMILY.MEDIUM};
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
  color: ${({ theme }) => theme.COLORS.SECONDARY};
`;

export const RefreshBudgetButton = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  gap: 4px;
  padding: 6px 10px;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.COLORS.GREY_40};
`;

export const RefreshBudgetText = styled(Text)`
  font-family: ${({ theme }) => theme.FONT_FAMILY.MEDIUM};
  font-size: ${({ theme }) => theme.FONT_SIZE.SSM}px;
  color: ${({ theme }) => theme.COLORS.GREY_60};
`;

export const PriceButtonContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
