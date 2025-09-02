import { View, Text, Image, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';

export const Container = styled(TouchableOpacity)`
  background: ${({ theme }) => theme.COLORS.WHITE};

  border-radius: 14px;

  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);

  margin-bottom: 16px;
`;

export const ServiceHeader = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding: 20px 20px 16px 20px;
`;

export const ServiceDescription = styled(Text)`
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
  color: ${({ theme }) => theme.COLORS.GREY_60};

  text-align: justify;

  padding: 0 20px 16px 20px;
`;

export const ServiceTitle = styled(Text)`
  font-family: ${({ theme }) => theme.FONT_FAMILY.MEDIUM};
  font-size: ${({ theme }) => theme.FONT_SIZE.LG}px;
  color: ${({ theme }) => theme.COLORS.GREY};
  line-height: 24px;

  flex: 1;
  margin-right: 20px;
`;

export const ServiceImagesContainer = styled(View)`
  flex-direction: row;
  padding-left: 10px;
`;

export const ServiceImage = styled(Image)`
  width: 40px;
  height: 40px;

  border-radius: 50px;

  margin-left: -10px;
`;

export const MorePhotosContainer = styled(View)`
  align-items: center;
  justify-content: center;

  background-color: ${({ theme }) => theme.COLORS.BLACK}80;
  border: 1px solid ${({ theme }) => theme.COLORS.WHITE};

  width: 40px;
  height: 40px;

  border-radius: 100px;

  margin-left: -40px;
`;

export const MorePhotos = styled(Text)`
  font-family: ${({ theme }) => theme.FONT_FAMILY.MEDIUM};
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
  color: ${({ theme }) => theme.COLORS.WHITE};
`;

export const ServiceDetails = styled(View)`
  padding: 20px;

  gap: 10px;

  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.COLORS.GREY_20}80;

  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.COLORS.GREY_20}80;
`;

export const ServiceDetailItem = styled(View)`
  flex-direction: row;
  align-items: center;
`;

export const ServiceDetailDescription = styled(Text)`
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
  color: ${({ theme }) => theme.COLORS.GREY_60};

  margin-left: 8px;
`;

export const CarouselContainer = styled(View)`
  padding: 20px 20px 0;
`;

export const ServiceDetailFooter = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  padding: 20px;
`;

export const RequiredBudgetTextContainer = styled(View)`
  border-top-left-radius: 100px;
  border-bottom-left-radius: 100px;

  border-radius: 2px;
`;

export const RequiredBudgetText = styled(Text)`
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
`;

export const ServiceButton = styled(View)`
  align-items: center;
  justify-content: center;
  margin-left: 30px;

  height: 50px;

  width: max-content;
  min-width: 140px;

  border: 1px solid ${({ theme }) => theme.COLORS.SECONDARY};
  border-radius: 100px;
`;

export const ServiceButtonText = styled(Text)`
  font-family: ${({ theme }) => theme.FONT_FAMILY.MEDIUM};
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  color: ${({ theme }) => theme.COLORS.SECONDARY};
`;

export const ServiceButtonIcon = styled(Feather)`
  color: ${({ theme }) => theme.COLORS.SECONDARY};
`;

export const CarouselImage = styled(Image)`
  width: 100%;
  height: 100%;

  border-radius: 14px;
`;
