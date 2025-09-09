import { TouchableOpacity, View, Text } from 'react-native';
import styled, { css } from 'styled-components/native';

type ITabTextProps = {
  isActive: boolean;
};

export const Container = styled(View)`
  background-color: ${({ theme }) => theme.COLORS.WHITE};
`;

export const TabContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.COLORS.GREY_20};
`;

export const TabButton = styled(TouchableOpacity)`
  flex: 1;
  align-items: center;
  padding: 16px 0;
  position: relative;
`;

export const TabText = styled(Text)<ITabTextProps>`
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  color: ${({ theme }) => theme.COLORS.GREY_60};

  ${(props) =>
    props.isActive &&
    css`
      color: ${({ theme }) => theme.COLORS.BLACK};
      font-family: ${({ theme }) => theme.FONT_FAMILY.MEDIUM};
    `}
`;

export const TabUnderline = styled(View)`
  position: absolute;
  bottom: 0;
  height: 2px;
  width: 60px;
  background-color: ${({ theme }) => theme.COLORS.BLACK};
  border-radius: 1px;
`;
