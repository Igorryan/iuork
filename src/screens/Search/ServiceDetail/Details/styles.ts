import { View, Text } from 'react-native';
import styled from 'styled-components/native';

// libs
import { Feather } from '@expo/vector-icons';

// types

// styles
export const Container = styled(View)<{ hasCarousel?: boolean }>`
  padding: ${({ hasCarousel }) => hasCarousel ? '32px 20px' : '20px 20px'};
`;

export const ServiceTitle = styled(Text)`
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  font-size: ${({ theme }) => theme.FONT_SIZE.XL}px;
  color: ${({ theme }) => theme.COLORS.GREY};
`;

export const ServiceDescription = styled(Text)`
  margin-top: 16px;

  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
  color: ${({ theme }) => theme.COLORS.GREY_60};
`;

export const ServiceDetailList = styled(View)`
  margin-top: 32px;
  gap: 10px;
`;

export const ServiceDetailItem = styled(View)`
  flex-direction: row;
  align-items: center;
`;

export const ServiceDetailItemIcon = styled(Feather)`
  color: ${({ theme }) => theme.COLORS.GREY_60};
`;

export const ServiceDetailDescription = styled(Text)`
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
  color: ${({ theme }) => theme.COLORS.GREY_60};

  margin-left: 8px;
`;
