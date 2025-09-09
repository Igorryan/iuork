import { View, Image, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

// libs

// types

// styles
export const Container = styled(View)`
  background-color: #F8F9FA;
  padding: 0px 20px 20px;
  border-bottom-left-radius: 24px;
  border-bottom-right-radius: 24px;
`;

export const ProfileMainContainer = styled(View)`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

`;

export const ProfileInfoContainer = styled(View)`
  align-items: flex-start;
  padding-top: 40px;
  `;

export const TopInfoContainer = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  z-index: 1;
  margin-bottom: 16px;
  gap: 8px;
`;

export const RatingContainer = styled(View)`
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  flex-direction: row;
  align-items: center;
  padding: 8px 12px;
  border-radius: 20px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 3;
`;

export const RatingText = styled(Text)`
  font-family: ${({ theme }) => theme.FONT_FAMILY.MEDIUM};
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
  color: ${({ theme }) => theme.COLORS.GREY};
  margin-left: 4px;
`;

export const PriceText = styled(Text)`
  font-family: ${({ theme }) => theme.FONT_FAMILY.MEDIUM};
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
  color: ${({ theme }) => theme.COLORS.WHITE};
`;

export const ProfileImageContainer = styled(View)`
  padding-top: 16px;
`;

export const UserAvatar = styled(Image)`
  width: 220px;
  height: 280px;
`;

export const UserName = styled(Text)`
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  font-size: ${({ theme }) => theme.FONT_SIZE.XL}px;
  color: ${({ theme }) => theme.COLORS.GREY};
  text-align: left;
`;

export const ProfessionText = styled(Text)`
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  color: ${({ theme }) => theme.COLORS.GREY_60};
  margin-top: 4px;
  margin-bottom: 16px;
  text-align: left;
`;

export const ButtonMessage = styled(TouchableOpacity)`
  margin: 0 auto;
  border-radius: 24px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.COLORS.GREY_20};
  padding: 8px 36px;
`;

export const ButtonMessageText = styled(Text)`
  font-family: ${({ theme }) => theme.FONT_FAMILY.MEDIUM};
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  color: ${({ theme }) => theme.COLORS.GREY};
  text-align: center;
`;
