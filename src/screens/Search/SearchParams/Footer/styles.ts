import { View, Text, TouchableOpacity } from 'react-native';
import styled, { css } from 'styled-components/native';

import { Ionicons } from '@expo/vector-icons';

export const Footer = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  background-color: ${({ theme }) => theme.COLORS.WHITE};

  padding: 16px 24px 16px;

  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.COLORS.GREY_20};
`;

export const ClearAll = styled(TouchableOpacity)``;

export const ClearAllText = styled(Text)`
  color: ${({ theme }) => theme.COLORS.GREY_60};
  font-family: ${({ theme }) => theme.FONT_FAMILY.MEDIUM};
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;

  text-decoration: underline;
`;

export const SearchButton = styled(TouchableOpacity)`
  align-items: center;
  flex-direction: row;
  justify-content: center;

  height: 50px;
  padding: 0 24px;

  border-radius: 8px;

  background-color: ${({ theme }) => theme.COLORS.SECONDARY};

  ${(props) =>
    props.disabled &&
    css`
      background-color: ${({ theme }) => theme.COLORS.GREY_20}90;
    `}
`;

export const SearchButtonText = styled(Text)`
  color: ${({ theme }) => theme.COLORS.WHITE};
  font-family: ${({ theme }) => theme.FONT_FAMILY.MEDIUM};
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
`;

export const Icon = styled(Ionicons).attrs(({ theme }) => ({
  size: 22,
  color: theme.COLORS.WHITE,
}))`
  margin-right: 8px;
`;
