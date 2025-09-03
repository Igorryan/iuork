import { View, Image, Text } from 'react-native';
import styled from 'styled-components/native';

// libs

// types

// styles
export const Container = styled(View)`
  padding: 0 20px;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  padding-top: 16px;
`;

export const StatusContainer = styled(View)`
  flex-direction: row;
`;

export const UserAvatar = styled(Image)`
  width: 86px;
  height: 86px;

  border-radius: 22px;
  margin-right: 20px;

  /* border: 1px solid ${({ theme }) => theme.COLORS.GREY_20}; */
`;

export const StatusDetailsContainer = styled(View)`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

export const StatusContentBlock = styled(View)`
  align-items: center;
`;

export const StatusValue = styled(Text)`
  font-family: ${({ theme }) => theme.FONT_FAMILY.MEDIUM};
  font-size: ${({ theme }) => theme.FONT_SIZE.LG}px;
`;

export const StatusDescription = styled(Text)`
  font-family: ${({ theme }) => theme.FONT_FAMILY.MEDIUM};
  font-size: ${({ theme }) => theme.FONT_SIZE.SSM}px;
  color: ${({ theme }) => theme.COLORS.GREY_60};

  margin-top: 4px;
`;

export const DescriptionContainer = styled(View)``;

export const NameContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
`;

export const UserName = styled(Text)`
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  font-size: ${({ theme }) => theme.FONT_SIZE.LG}px;
  color: ${({ theme }) => theme.COLORS.GREY};
`;

export const Profession = styled(Text)`
  padding: 4px 8px;
  border-radius: 100px;
`;

export const ServiceCategoryContainer = styled(View)`
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

export const ServiceCategory = styled(Text)`
  font-size: ${({ theme }) => theme.FONT_SIZE.SSM}px;
  color: ${({ theme }) => theme.COLORS.GREY};

  border: 1px ${({ theme }) => theme.COLORS.GREY_60};
  padding: 4px 8px;
  border-radius: 100px;
  margin-top: 14px;
`;

export const ServiceCategoryProfession = styled(Text)`
  font-size: ${({ theme }) => theme.FONT_SIZE.SSM}px;
  color: ${({ theme }) => theme.COLORS.WHITE};
  background-color: ${({ theme }) => theme.COLORS.GREY};
  border: 1px ${({ theme }) => theme.COLORS.GREY_60};
  padding: 4px 8px;
  border-radius: 100px;
  margin-top: 14px;
`;

export const UserDescription = styled(Text)`
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
  color: ${({ theme }) => theme.COLORS.GREY_60};

  margin-top: 16px;

  padding-bottom: 26px;
`;
