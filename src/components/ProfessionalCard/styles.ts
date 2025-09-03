import { View, Text, Image, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

import { Feather } from '@expo/vector-icons';

export const Container = styled(TouchableOpacity)`
  flex-direction: row;

  border-radius: 12px;

  margin-right: 10px;

  background-color: ${({ theme }) => theme.COLORS.WHITE};
  /* box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px; */
`;

export const Picture = styled(Image)`
  width: 100px;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
`;

export const ProfessionalInfoContainer = styled(View)`
  flex: 1;
  margin-top: 10px;
`;

export const NameAndSaveIconContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  padding: 0 12px;
`;

export const Name = styled(Text)`
  font-family: ${({ theme }) => theme.FONT_FAMILY.MEDIUM};
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
`;

export const SaveIcon = styled(Feather)`
  color: ${({ theme }) => theme.COLORS.GREY_80};
`;

export const WobsWord = styled(Text)`
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  font-size: ${({ theme }) => theme.FONT_SIZE.SSM}px;

  color: ${({ theme }) => theme.COLORS.GREY};
`;

export const WobsDescription = styled(Text)`
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-size: ${({ theme }) => theme.FONT_SIZE.SSM}px;

  color: ${({ theme }) => theme.COLORS.GREY_60};

  padding: 0 12px;

  margin-bottom: 4px;
`;

export const Type = styled(Text)`
  font-family: ${({ theme }) => theme.FONT_FAMILY.MEDIUM};
  font-size: ${({ theme }) => theme.FONT_SIZE.SSM}px;

  color: ${({ theme }) => theme.COLORS.GREY_80};

  margin-top: 2px;
  margin-bottom: 6px;
  padding: 0 12px;
`;

export const Distance = styled(Text)`
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-size: ${({ theme }) => theme.FONT_SIZE.SSM}px;

  color: ${({ theme }) => theme.COLORS.GREY_60};
  padding: 0 12px;
`;

export const Footer = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  margin-top: 20px;
`;

export const RatingsContainer = styled(View)`
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding: 0 12px;
  margin-bottom: 10px;

  position: absolute;
  bottom: 0;
  right: 0;
`;

export const Rating = styled(Text)`
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-size: ${({ theme }) => theme.FONT_SIZE.SSM}px;

  color: ${({ theme }) => theme.COLORS.GREY};

  margin-left: 4px;
`;

export const RatingCount = styled(Text)`
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-size: ${({ theme }) => theme.FONT_SIZE.SSM}px;

  color: ${({ theme }) => theme.COLORS.GREY};
`;
