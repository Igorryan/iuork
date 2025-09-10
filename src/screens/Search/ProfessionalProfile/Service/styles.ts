import { View, Text, Image, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';

export const Container = styled(TouchableOpacity)`
  background: ${({ theme }) => theme.COLORS.WHITE};

  border-radius: 14px;
  padding-bottom: 12px;
  margin-bottom: 12px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.COLORS.GREY_20};
`;

export const Row = styled(View)`
  flex-direction: row;
  align-items: center;
`;

export const CardContent = styled(View)`
  flex-direction: row;
  align-items: center;
  padding: 16px 16px;
`;

export const Thumbnail = styled(Image)`
  width: 68px;
  height: 68px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.COLORS.GREY_10};
`;

export const ContentColumn = styled(View)`
  flex: 1;
  margin-left: 14px;
`;

export const ServiceTitle = styled(Text)`
  font-family: ${({ theme }) => theme.FONT_FAMILY.MEDIUM};
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  color: ${({ theme }) => theme.COLORS.GREY};
  line-height: 22px;
`;

export const MetaRow = styled(Row)`
  margin-top: 8px;
`;

export const ServiceDescription = styled(Text)`
  margin-top: 8px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-size: ${({ theme }) => theme.FONT_SIZE.SSM}px;
  color: ${({ theme }) => theme.COLORS.GREY_60};
  line-height: 18px;
`;

export const MetaText = styled(Text)`
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-size: ${({ theme }) => theme.FONT_SIZE.SSM}px;
  color: ${({ theme }) => theme.COLORS.GREY_60};
  margin-left: 6px;
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

export const PricePill = styled(View)`
  padding: 6px 10px;
  background-color: ${({ theme }) => theme.COLORS.SECONDARY}20;
  border-radius: 999px;
`;

export const ServiceDetailItem = styled(View)`
  flex-direction: row;
  align-items: center;
`;

export const PriceText = styled(Text)`
  font-family: ${({ theme }) => theme.FONT_FAMILY.MEDIUM};
  font-size: ${({ theme }) => theme.FONT_SIZE.SSM}px;
  color: ${({ theme }) => theme.COLORS.SECONDARY};
`;

export const RightColumn = styled(View)`
  align-items: flex-end;
  margin-left: 12px;
`;

export const Chevron = styled(Feather).attrs({ name: 'chevron-right' })`
  color: ${({ theme }) => theme.COLORS.GREY_40};
`;

export const PlaceholderThumb = styled(View)`
  width: 68px;
  height: 68px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.COLORS.GREY_10};
`;

export const ThumbOverlay = styled(View)`
  position: absolute;
  bottom: 8px;
  right: 8px;
  padding: 4px 8px;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  border-radius: 12px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.COLORS.SECONDARY};
  align-items: center;
  justify-content: center;
  shadow-color: #000;
  shadow-offset: 0px 1px;
  shadow-opacity: 0.15;
  shadow-radius: 2px;
  elevation: 2;
`;

export const ThumbOverlayText = styled(Text)`
  font-family: ${({ theme }) => theme.FONT_FAMILY.MEDIUM};
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
  color: ${({ theme }) => theme.COLORS.SECONDARY};
`;

export const ThumbOverlayIcon = styled(Feather).attrs({ name: 'image' })`
  color: ${({ theme }) => theme.COLORS.SECONDARY};
  margin-right: 4px;
`;

export const ThumbWrapper = styled(View)`
  position: relative;
  width: 68px;
  height: 68px;
`;

export const Dot = styled(View)`
  width: 4px;
  height: 4px;
  border-radius: 2px;
  background-color: ${({ theme }) => theme.COLORS.GREY_20};
  margin: 0 6px;
`;

export const Trailing = styled(Row)``;

export const BudgetBadge = styled(View)`
  padding: 6px 10px;
  border: 1px solid ${({ theme }) => theme.COLORS.SECONDARY};
  border-radius: 999px;
`;

export const BudgetBadgeText = styled(Text)`
  font-family: ${({ theme }) => theme.FONT_FAMILY.MEDIUM};
  font-size: ${({ theme }) => theme.FONT_SIZE.SSM}px;
  color: ${({ theme }) => theme.COLORS.SECONDARY};
`;

export const CarouselImage = styled(Image)`
  width: 100%;
  height: 100%;

  border-radius: 14px;
`;
