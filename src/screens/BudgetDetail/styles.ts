import styled from 'styled-components/native';
import { SafeAreaView, View, Text, TouchableOpacity, ScrollView } from 'react-native';

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
`;

export const Header = styled(View)`
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.COLORS.GREY_20};
`;

export const BackButton = styled(TouchableOpacity)`
  padding: 8px;
  margin-right: 8px;
`;

export const HeaderTitle = styled(Text)`
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  font-size: ${({ theme }) => theme.FONT_SIZE.LG}px;
  color: ${({ theme }) => theme.COLORS.PRIMARY};
`;

export const LoadingContainer = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Content = styled(ScrollView).attrs({
  contentContainerStyle: {
    padding: 16,
  },
})``;

export const Card = styled(View)`
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  border-radius: 12px;
  padding: 24px;
  shadow-color: ${({ theme }) => theme.COLORS.SHADOW};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 3;
`;

export const IconContainer = styled(View)`
  align-items: center;
  margin-bottom: 24px;
`;

export const Section = styled(View)`
  margin-bottom: 16px;
`;

export const Label = styled(Text)`
  font-family: ${({ theme }) => theme.FONT_FAMILY.MEDIUM};
  font-size: ${({ theme }) => theme.FONT_SIZE.SSM}px;
  color: ${({ theme }) => theme.COLORS.GREY_60};
  margin-bottom: 8px;
`;

export const Value = styled(Text)`
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  color: ${({ theme }) => theme.COLORS.GREY};
`;

export const Description = styled(Text)`
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
  color: ${({ theme }) => theme.COLORS.GREY};
  line-height: 20px;
`;

export const PriceSection = styled(View)`
  background-color: ${({ theme }) => theme.COLORS.SECONDARY}10;
  padding: 16px;
  border-radius: 8px;
  align-items: center;
  margin-bottom: 16px;
`;

export const Price = styled(Text)`
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  font-size: ${({ theme }) => theme.FONT_SIZE.XXL}px;
  color: ${({ theme }) => theme.COLORS.SECONDARY};
`;

export const StatusBadge = styled(View)<{ status: string }>`
  padding: 8px 16px;
  border-radius: 16px;
  align-self: flex-start;
  background-color: ${({ theme, status }) => {
    if (status === 'PENDING') return theme.COLORS.WARNING + '20';
    if (status === 'QUOTED') return theme.COLORS.SECONDARY + '20';
    if (status === 'ACCEPTED') return theme.COLORS.SUCCESS + '20';
    if (status === 'REJECTED') return theme.COLORS.ERROR + '20';
    if (status === 'EXPIRED') return theme.COLORS.GREY_60 + '20';
    return theme.COLORS.GREY_20;
  }};
`;

export const StatusText = styled(Text)<{ status: string }>`
  font-family: ${({ theme }) => theme.FONT_FAMILY.MEDIUM};
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
  color: ${({ theme, status }) => {
    if (status === 'PENDING') return theme.COLORS.WARNING;
    if (status === 'QUOTED') return theme.COLORS.SECONDARY;
    if (status === 'ACCEPTED') return theme.COLORS.SUCCESS;
    if (status === 'REJECTED') return theme.COLORS.ERROR;
    if (status === 'EXPIRED') return theme.COLORS.GREY_60;
    return theme.COLORS.GREY;
  }};
`;

export const ExpirySection = styled(View)<{ isExpired: boolean }>`
  flex-direction: row;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
`;

export const ExpiryText = styled(Text)<{ isExpired: boolean }>`
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
  color: ${({ theme, isExpired }) => isExpired ? theme.COLORS.ERROR : theme.COLORS.GREY_60};
`;

export const Divider = styled(View)`
  height: 1px;
  background-color: ${({ theme }) => theme.COLORS.GREY_20};
  margin: 16px 0;
`;

