import { View, Image, Text } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled(View)`
  background: ${({ theme }) => theme.COLORS.WHITE};
  padding: 20px;

  border-radius: 12px;

  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.COLORS.GREY_10};
`;

export const RatingHeader = styled(View)`
  flex-direction: row;
  align-items: center;
`;

export const RatingUserImage = styled(Image)`
  width: 45px;
  height: 45px;

  border-radius: 50px;

  margin-right: 16px;
`;

export const RatingDetailsContainer = styled(View)`
  align-items: flex-start;
`;

export const RatingUserName = styled(Text)`
  font-family: ${({ theme }) => theme.FONT_FAMILY.MEDIUM};
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  color: ${({ theme }) => theme.COLORS.GREY};
`;

export const RatingStarContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  margin-top: 6px;
`;

export const RatingCount = styled(Text)`
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-size: ${({ theme }) => theme.FONT_SIZE.SSM}px;
  color: ${({ theme }) => theme.COLORS.GREY_40};

  margin-left: 6px;
`;

export const RatingDescription = styled(Text)`
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
  color: ${({ theme }) => theme.COLORS.GREY_80};

  margin-top: 16px;
`;

export const RatingFooter = styled(View)`
  margin-top: 16px;
`;

export const ServiceNameContainer = styled(View)`
  background-color: ${({ theme }) => theme.COLORS.GREY_20}80;
  padding: 6px 10px;
  border-radius: 4px;
  margin-top: 16px;
`;

export const ServiceName = styled(Text)`
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-size: ${({ theme }) => theme.FONT_SIZE.SSM}px;
  color: ${({ theme }) => theme.COLORS.GREY_80};
`;

export const RatingDate = styled(Text)`
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-size: ${({ theme }) => theme.FONT_SIZE.SSM}px;
  color: ${({ theme }) => theme.COLORS.GREY_40};
`;
