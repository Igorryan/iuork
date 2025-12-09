import { TouchableOpacity, View, Text } from 'react-native';
import styled, { css } from 'styled-components/native';

interface IBlockProps {
  isActive: boolean;
}

export const ExpansiveView = styled(View).attrs<IBlockProps>(({ theme, isActive }) => ({
  style: {
    shadowColor: theme.COLORS.SHADOW,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: isActive ? 0.08 : 0,
    shadowRadius: isActive ? 20 : 0,
    elevation: isActive ? 4 : 0,
  },
}))<IBlockProps>`
  background-color: ${({ theme }) => theme.COLORS.WHITE};

  border: 1px solid ${({ theme }) => theme.COLORS.GREY_10};

  border-radius: 24px;
  overflow: visible;

  ${(props) =>
    !props.isActive &&
    css`
      border-radius: 12px;
    `}
`;

export const BlockMinimized = styled(TouchableOpacity)<IBlockProps>`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  padding: 12px;

  width: 100%;
  padding: 20px 24px 24px;
  border-radius: 12px;

  ${(props) =>
    !props.isActive &&
    css`
      display: none;
    `}
`;

export const BlockMinimizedTitle = styled(Text)`
  color: ${({ theme }) => theme.COLORS.GREY_60};
  font-family: ${({ theme }) => theme.FONT_FAMILY.MEDIUM};
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
`;

export const BlockMinimizedValue = styled(Text)`
  color: ${({ theme }) => theme.COLORS.GREY};
  font-family: ${({ theme }) => theme.FONT_FAMILY.MEDIUM};
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
`;

export const BlockMinimizedText = styled(Text)`
  color: ${({ theme }) => theme.COLORS.GREY};
  font-family: ${({ theme }) => theme.FONT_FAMILY.MEDIUM};
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
`;

export const BlockMaximized = styled(View)<IBlockProps>`
  padding: 20px 24px 24px;
  overflow: visible;

  ${(props) =>
    !props.isActive &&
    css`
      display: none;
    `}
`;

export const BlockMaximizedTitle = styled(Text)`
  color: ${({ theme }) => theme.COLORS.GREY};
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  font-size: ${({ theme }) => theme.FONT_SIZE.XL}px;

  margin-bottom: 20px;
`;
