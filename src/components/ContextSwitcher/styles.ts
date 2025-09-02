import { Animated, TouchableOpacity, View, Text } from 'react-native';
import styled, { css } from 'styled-components/native';

type IOptionTextProps = {
  isActive: boolean;
};

export const Container = styled(View)`
  height: 44px;

  flex-direction: row;
  align-items: center;
  justify-content: space-around;

  border-radius: 100px;
  padding: 0 12px;
  margin-right: 8px;

  background-color: ${({ theme }) => theme.COLORS.GREY_20}40;
`;

export const SelectedContainer = styled(Animated.View)`
  position: absolute;

  height: 30px;
  width: 50%;

  background-color: ${({ theme }) => theme.COLORS.WHITE};

  border-radius: 100px;
`;

export const OptionButton = styled(TouchableOpacity)`
  flex: 1;
  height: 100%;
  justify-content: center;
`;

export const OptionText = styled(Text)<IOptionTextProps>`
  color: ${({ theme }) => theme.COLORS.GREY_60};
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;

  text-align: center;

  ${(props) =>
    props.isActive &&
    css`
      color: ${({ theme }) => theme.COLORS.BLACK};
      font-family: ${({ theme }) => theme.FONT_FAMILY.MEDIUM};
    `}
`;
