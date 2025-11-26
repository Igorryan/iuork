import { View, Text } from 'react-native';
import styled from 'styled-components/native';

// libs

// types

// styles
export const Container = styled(View)``;

export const ServicePriceContainer = styled(View)`
  border-radius: 2px;
  padding: 8px 12px;
`;

export const ServicePriceTitle = styled(Text)`
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
  color: ${({ theme }) => theme.COLORS.GREY_80};
  margin-top: 2px;
`;

export const ValuePriceContainer = styled(View)`
  flex-direction: row;
`;
export const ServicePriceValue = styled(Text)`
  font-family: ${({ theme }) => theme.FONT_FAMILY.MEDIUM};
  font-size: ${({ theme }) => theme.FONT_SIZE.LGG}px;
  color: ${({ theme }) => theme.COLORS.GREY_80};
`;
