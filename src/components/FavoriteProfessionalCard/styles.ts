import { View, Text, Image, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled(TouchableOpacity)`
  flex-direction: row;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  border-radius: 16px;
  padding: 16px;
  margin-bottom: 16px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.08;
  shadow-radius: 8px;
  elevation: 3;
`;

export const Picture = styled(Image)`
  width: 88px;
  height: 88px;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.COLORS.GREY_10};
`;

export const ProfessionalInfoContainer = styled(View)`
  flex: 1;
  margin-left: 16px;
  justify-content: space-between;
`;

export const NameAndActionsContainer = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
`;

export const Name = styled(Text)`
  font-family: ${({ theme }) => theme.FONT_FAMILY.MEDIUM};
  font-size: ${({ theme }) => theme.FONT_SIZE.LG}px;
  color: ${({ theme }) => theme.COLORS.GREY};
  flex: 1;
  margin-right: 8px;
`;

export const Type = styled(Text)`
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
  color: ${({ theme }) => theme.COLORS.GREY_60};
  margin-bottom: 8px;
`;

export const Description = styled(Text)`
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-size: ${({ theme }) => theme.FONT_SIZE.SSM}px;
  color: ${({ theme }) => theme.COLORS.GREY_60};
  line-height: 18px;
  margin-bottom: 8px;
`;

export const RatingsContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  gap: 4px;
`;

export const Rating = styled(Text)`
  font-family: ${({ theme }) => theme.FONT_FAMILY.MEDIUM};
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
  color: ${({ theme }) => theme.COLORS.GREY};
`;

export const RatingCount = styled(Text)`
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
  color: ${({ theme }) => theme.COLORS.GREY_60};
`;

export const RemoveButton = styled(TouchableOpacity)`
  padding: 6px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.COLORS.GREY_10};
`;

