import { View, Text, Image, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';

export const Container = styled(TouchableOpacity)`
  background: ${({ theme }) => theme.COLORS.WHITE};
  border-radius: 12px;
  margin-bottom: 16px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.08;
  shadow-radius: 8px;
  elevation: 3;
`;

export const Row = styled(View)`
  flex-direction: row;
  align-items: center;
`;

export const CardContent = styled(View)`
  flex-direction: row;
  align-items: flex-start;
  padding: 20px;
  justify-content: space-between;
`;

export const Thumbnail = styled(Image)`
  width: 70px;
  height: 70px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.COLORS.GREY_10};
`;

export const LeftSection = styled(View)`
  flex: 1;
  justify-content: space-between;
  min-height: 100px;
  padding-right: 12px;
`;

export const RightSection = styled(View)`
  align-items: flex-end;
  margin-left: 16px;
  justify-content: space-between;
  min-height: 100px;
`;

export const ImageContainer = styled(View)`
  margin-top: auto;
`;

export const ServiceTitle = styled(Text)`
  font-family: ${({ theme }) => theme.FONT_FAMILY.MEDIUM};
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  color: ${({ theme }) => theme.COLORS.BLACK};
  line-height: 20px;
  margin-bottom: 6px;
`;

export const MetaRow = styled(Row)`
  margin-top: 6px;
  margin-bottom: 8px;
`;

export const ServiceDescription = styled(Text)`
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
  color: ${({ theme }) => theme.COLORS.GREY_60};
  line-height: 20px;
  margin-top: 2px;
  margin-bottom: auto;
`;

export const BottomRow = styled(View)`
  margin-top: auto;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
  flex-wrap: wrap;
`;

export const RatingContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
`;


export const RatingText = styled(Text)`
  font-family: ${({ theme }) => theme.FONT_FAMILY.MEDIUM};
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
  color: ${({ theme }) => theme.COLORS.BLACK};
`;

export const DescriptionLabel = styled(Text)`
  font-family: ${({ theme }) => theme.FONT_FAMILY.MEDIUM};
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
  color: ${({ theme }) => theme.COLORS.GREY};
  margin-bottom: 4px;
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

export const PriceButton = styled(TouchableOpacity)`
  padding: 8px 12px;
  background-color: #E3F2FD;
  border-radius: 999px;
  shadow-color: ${({theme}) => theme.COLORS.SECONDARY};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.15;
  shadow-radius: 4px;
  elevation: 2;
`;

export const RequestBudgetButton = styled(TouchableOpacity)`
  padding: 8px 12px;
  background-color: #E3F2FD;
  border-radius: 999px;
  shadow-color: ${({theme}) => theme.COLORS.SECONDARY};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.15;
  shadow-radius: 4px;
  elevation: 2;
`;

export const PendingBudgetButton = styled(TouchableOpacity)`
  padding: 8px 12px;
  background-color: #FFF9E6;
  border-radius: 999px;
  shadow-color: #FF8C00;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.15;
  shadow-radius: 4px;
  elevation: 2;
`;

export const PricePill = styled(View)`
  padding: 8px 12px;
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
  color: ${({theme}) => theme.COLORS.SECONDARY};
`;

export const RequestBudgetText = styled(Text)`
  font-family: ${({ theme }) => theme.FONT_FAMILY.MEDIUM};
  font-size: ${({ theme }) => theme.FONT_SIZE.SSM}px;
  color: ${({theme}) => theme.COLORS.SECONDARY};
`;

export const PendingBudgetText = styled(Text)`
  font-family: ${({ theme }) => theme.FONT_FAMILY.MEDIUM};
  font-size: ${({ theme }) => theme.FONT_SIZE.SSM}px;
  color: #FF8C00;
`;

export const ReceivedBudgetButton = styled(TouchableOpacity)`
  padding: 8px 12px;
  background-color: #E8F5E9;
  border-radius: 999px;
  shadow-color: #4CAF50;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.15;
  shadow-radius: 4px;
  elevation: 2;
`;

export const ReceivedBudgetText = styled(Text)`
  font-family: ${({ theme }) => theme.FONT_FAMILY.MEDIUM};
  font-size: ${({ theme }) => theme.FONT_SIZE.SSM}px;
  color: #4CAF50;
`;

export const RightColumn = styled(View)`
  align-items: flex-end;
  justify-content: center;
  margin-left: 8px;
`;

export const Chevron = styled(Feather).attrs({ name: 'chevron-right' })`
  color: ${({ theme }) => theme.COLORS.GREY_40};
`;

export const PlaceholderThumb = styled(View)`
  width: 70px;
  height: 70px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.COLORS.GREY_10};
`;

export const ThumbOverlay = styled(View)`
  position: absolute;
  bottom: 6px;
  left: 6px;
  padding: 4px 8px;
  background-color: rgba(0, 0, 0, 0.75);
  border-radius: 8px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const ThumbOverlayText = styled(Text)`
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  font-size: 10px;
  color: ${({ theme }) => theme.COLORS.WHITE};
  margin-left: 4px;
`;

export const ThumbOverlayIcon = styled(Feather).attrs({ name: 'image' })`
  color: ${({ theme }) => theme.COLORS.WHITE};
`;

export const ThumbWrapper = styled(View)`
  position: relative;
  width: 70px;
  height: 70px;
`;

export const Dot = styled(View)`
  width: 4px;
  height: 4px;
  border-radius: 2px;
  background-color: ${({ theme }) => theme.COLORS.GREY_20};
  margin: 0 6px;
`;

export const Trailing = styled(Row)``;

export const BudgetBadgeButton = styled(TouchableOpacity)`
  padding: 8px 12px;
  background-color: ${({ theme }) => theme.COLORS.SECONDARY};
  border-radius: 999px;
  shadow-color: ${({ theme }) => theme.COLORS.SECONDARY};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.15;
  shadow-radius: 4px;
  elevation: 2;
`;

export const BudgetBadge = styled(View)`
  padding: 10px 20px;
  background-color: ${({ theme }) => theme.COLORS.SECONDARY};
  border-radius: 24px;
  shadow-color: ${({ theme }) => theme.COLORS.SECONDARY};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.3;
  shadow-radius: 4px;
  elevation: 3;
`;

export const BudgetBadgeText = styled(Text)`
  font-family: ${({ theme }) => theme.FONT_FAMILY.MEDIUM};
  font-size: ${({ theme }) => theme.FONT_SIZE.SSM}px;
  color: ${({ theme }) => theme.COLORS.WHITE};
`;

export const CarouselImage = styled(Image)`
  width: 100%;
  height: 100%;

  border-radius: 14px;
`;
