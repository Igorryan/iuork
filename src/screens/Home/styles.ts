import styled from 'styled-components/native';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import theme from '@theme/index';

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${theme.COLORS.BACKGROUND};
`;

export const LoadingContainer = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Header = styled(View)`
  flex-direction: row;
  align-items: center;
  padding: 20px 24px 16px;
  margin-bottom: 8px;
`;

export const GreetingContainer = styled(View)`
  flex: 1;
`;

export const Title = styled(Text)`
  font-family: ${theme.FONT_FAMILY.BOLD};
  font-size: ${theme.FONT_SIZE.XXL}px;
  color: ${theme.COLORS.PRIMARY};
  margin-bottom: 4px;
`;

export const Subtitle = styled(Text)`
  font-family: ${theme.FONT_FAMILY.REGULAR};
  font-size: ${theme.FONT_SIZE.SM}px;
  color: ${theme.COLORS.GREY_60};
`;

export const Avatar = styled(Image)`
  width: 56px;
  height: 56px;
  border-radius: 28px;
  background-color: ${theme.COLORS.GREY_10};
  margin-right: 12px;
`;

export const AvatarPlaceholder = styled(View)`
  width: 56px;
  height: 56px;
  border-radius: 28px;
  background-color: ${theme.COLORS.GREY_10};
  align-items: center;
  justify-content: center;
  margin-right: 12px;
`;

export const UserInfoContainer = styled(View)`
  flex: 1;
  justify-content: center;
`;

export const UserName = styled(Text)`
  font-family: ${theme.FONT_FAMILY.BOLD};
  font-size: ${theme.FONT_SIZE.LG}px;
  color: ${theme.COLORS.PRIMARY};
  margin-bottom: 4px;
`;

export const LocationContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  gap: 4px;
`;

export const LocationText = styled(Text)`
  font-family: ${theme.FONT_FAMILY.REGULAR};
  font-size: ${theme.FONT_SIZE.SM}px;
  color: ${theme.COLORS.GREY_60};
  flex: 1;
`;

export const HeaderActions = styled(View)`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

export const HeaderButton = styled(TouchableOpacity)`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${theme.COLORS.WHITE};
  align-items: center;
  justify-content: center;
  shadow-color: ${theme.COLORS.SHADOW};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 2;
`;

export const SearchRow = styled(View)`
  flex-direction: row;
  align-items: center;
  gap: 12px;
  padding: 0 24px 16px;
`;

export const SearchBox = styled(TouchableOpacity)`
  flex: 1;
  height: 48px;
  border-radius: 24px;
  background-color: ${theme.COLORS.WHITE};
  padding: 0 16px;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  shadow-color: ${theme.COLORS.SHADOW};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.05;
  shadow-radius: 8px;
  elevation: 2;
`;

export const SearchPlaceholder = styled(Text)`
  color: ${theme.COLORS.GREY_60};
  font-size: ${theme.FONT_SIZE.MD}px;
  font-family: ${theme.FONT_FAMILY.REGULAR};
`;

export const FilterButton = styled(TouchableOpacity)`
  width: 48px;
  height: 48px;
  border-radius: 24px;
  background-color: ${theme.COLORS.SECONDARY};
  align-items: center;
  justify-content: center;
  shadow-color: ${theme.COLORS.SECONDARY};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.2;
  shadow-radius: 4px;
  elevation: 2;
`;

export const SectionTitle = styled(Text)`
  font-family: ${theme.FONT_FAMILY.BOLD};
  font-size: ${theme.FONT_SIZE.LG}px;
  color: ${theme.COLORS.PRIMARY};
  padding: 0 24px 12px;
  margin-top: 8px;
  margin-bottom: 0;
`;

export const CategoriesContainer = styled(ScrollView)`
  padding: 0 24px 16px;
`;

export const CategoryChip = styled(TouchableOpacity)<{ isSelected: boolean; categoryColor: string }>`
  flex-direction: row;
  align-items: center;
  padding: 10px 16px;
  border-radius: 24px;
  background-color: ${props => props.isSelected ? props.categoryColor : theme.COLORS.WHITE};
  margin-right: 12px;
  border-width: ${props => props.isSelected ? 0 : 1.5}px;
  border-color: ${props => props.isSelected ? 'transparent' : props.categoryColor};
  shadow-color: ${theme.COLORS.SHADOW};
  shadow-offset: 0px 2px;
  shadow-opacity: ${props => props.isSelected ? 0.15 : 0.05};
  shadow-radius: 8px;
  elevation: ${props => props.isSelected ? 3 : 1};
`;

export const CategoryIconContainer = styled(View)<{ categoryColor: string; isSelected: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  background-color: ${props => props.isSelected ? 'rgba(255, 255, 255, 0.3)' : `${props.categoryColor}15`};
  align-items: center;
  justify-content: center;
  margin-right: 8px;
`;

export const CategoryText = styled(Text)<{ isSelected: boolean }>`
  color: ${props => props.isSelected ? theme.COLORS.WHITE : theme.COLORS.PRIMARY};
  font-family: ${theme.FONT_FAMILY.BOLD};
  font-size: ${theme.FONT_SIZE.SM}px;
`;

export const FeaturedContainer = styled(ScrollView)`
  padding: 0 24px 16px;
`;

export const FeaturedCard = styled(TouchableOpacity)`
  width: 280px;
  height: 200px;
  border-radius: 20px;
  overflow: hidden;
  margin-right: 16px;
  position: relative;
`;

export const FeaturedImage = styled(Image)`
  width: 100%;
  height: 100%;
  background-color: ${theme.COLORS.GREY_10};
`;

export const FeaturedImagePlaceholder = styled(View)`
  width: 100%;
  height: 100%;
  background-color: ${theme.COLORS.GREY_10};
  align-items: center;
  justify-content: center;
`;

export const FeaturedGradient = styled(View)`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100px;
  background-color: rgba(0,0,0,0.5);
`;

export const FeaturedContent = styled(View)`
  position: absolute;
  left: 16px;
  right: 16px;
  bottom: 16px;
`;

export const FeaturedName = styled(Text)`
  color: ${theme.COLORS.WHITE};
  font-family: ${theme.FONT_FAMILY.BOLD};
  font-size: ${theme.FONT_SIZE.LG}px;
  margin-bottom: 4px;
`;

export const FeaturedProfession = styled(Text)`
  color: ${theme.COLORS.WHITE}CC;
  font-family: ${theme.FONT_FAMILY.REGULAR};
  font-size: ${theme.FONT_SIZE.SM}px;
  margin-bottom: 8px;
`;

export const FeaturedRating = styled(View)`
  flex-direction: row;
  align-items: center;
  gap: 4px;
`;

export const FeaturedRatingText = styled(Text)`
  color: ${theme.COLORS.WHITE};
  font-family: ${theme.FONT_FAMILY.BOLD};
  font-size: ${theme.FONT_SIZE.SM}px;
`;

export const CategorySection = styled(View)`
  margin-bottom: 24px;
`;

export const CategorySectionHeader = styled(View)`
  flex-direction: row;
  align-items: center;
  padding: 0 24px 12px;
  margin-top: 8px;
`;

export const CategorySectionIconContainer = styled(View)<{ categoryColor: string }>`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  background-color: ${props => `${props.categoryColor}15`};
  align-items: center;
  justify-content: center;
  margin-right: 10px;
`;

export const CategorySectionTitle = styled(Text)`
  font-family: ${theme.FONT_FAMILY.BOLD};
  font-size: ${theme.FONT_SIZE.LG}px;
  color: ${theme.COLORS.PRIMARY};
`;

export const ServicesHorizontalList = styled(ScrollView)`
  padding: 0 24px;
`;

export const ServiceCardHorizontal = styled(TouchableOpacity)<{ categoryColor: string }>`
  width: 160px;
  background-color: ${theme.COLORS.WHITE};
  border-radius: 16px;
  padding: 0;
  padding-bottom: 12px;
  margin-right: 12px;
  align-items: center;
  overflow: hidden;
  shadow-color: ${theme.COLORS.SHADOW};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.05;
  shadow-radius: 8px;
  elevation: 2;
  border-width: 1px;
  border-color: ${props => `${props.categoryColor}20`};
`;

export const ServiceIconContainerHorizontal = styled(View)<{ categoryColor: string }>`
  width: 100%;
  height: 120px;
  background-color: ${props => `${props.categoryColor}15`};
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
  overflow: hidden;
`;

export const ServiceNameHorizontal = styled(Text)`
  color: ${theme.COLORS.PRIMARY};
  font-family: ${theme.FONT_FAMILY.MEDIUM};
  font-size: ${theme.FONT_SIZE.SM}px;
  text-align: center;
  padding-horizontal: 8px;
`;

export const ServiceImageHorizontal = styled(Image)`
  width: 100%;
  height: 100%;
`;

export const EmptyContainer = styled(View)`
  align-items: center;
  justify-content: center;
  padding: 64px 24px;
`;

export const EmptyText = styled(Text)`
  color: ${theme.COLORS.PRIMARY};
  font-family: ${theme.FONT_FAMILY.BOLD};
  font-size: ${theme.FONT_SIZE.LG}px;
  margin-top: 16px;
  margin-bottom: 8px;
`;

export const EmptySubtext = styled(Text)`
  color: ${theme.COLORS.GREY_60};
  font-family: ${theme.FONT_FAMILY.REGULAR};
  font-size: ${theme.FONT_SIZE.MD}px;
  text-align: center;
`;

export const BannerContainer = styled(View)`
  margin: 0 24px 12px;
  height: 230px;
  overflow: hidden;
  position: relative;
  elevation: 3;
  shadow-color: ${theme.COLORS.SHADOW};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.15;
  shadow-radius: 8px;
`;

export const BannerImage = styled(Image)`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  resize-mode: contain;
`;

export const BannerOverlay = styled(View)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 1;
`;

export const BannerContent = styled(View)`
  width: 100%;
  height: 100%;
  flex-direction: row;
  align-items: center;
  padding: 20px;
  z-index: 2;
  position: relative;
`;

export const BannerTextContainer = styled(View)`
  flex: 1;
  justify-content: center;
  z-index: 2;
`;

export const BannerTitle = styled(Text)`
  font-family: ${theme.FONT_FAMILY.BOLD};
  font-size: ${theme.FONT_SIZE.XXL}px;
  color: ${theme.COLORS.WHITE};
  margin-bottom: 4px;
  text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);
`;

export const BannerSubtitle = styled(Text)`
  font-family: ${theme.FONT_FAMILY.REGULAR};
  font-size: ${theme.FONT_SIZE.MD}px;
  color: ${theme.COLORS.WHITE};
  margin-bottom: 16px;
  opacity: 0.95;
  text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3);
`;

export const BannerButton = styled(TouchableOpacity)`
  background-color: ${theme.COLORS.SECONDARY};
  padding: 12px 24px;
  border-radius: 12px;
  align-self: flex-start;
`;

export const BannerButtonText = styled(Text)`
  font-family: ${theme.FONT_FAMILY.BOLD};
  font-size: ${theme.FONT_SIZE.MD}px;
  color: ${theme.COLORS.WHITE};
`;

export const CategoriesSection = styled(View)`
  margin-bottom: 24px;
  margin-top: 8px;
`;

export const CategoriesHorizontalList = styled(ScrollView)`
  margin-top: 12px;
  padding-left: 0;
`;

export const CategoryCard = styled(TouchableOpacity)<{ categoryColor: string }>`
  background-color: transparent;
  align-items: center;
  justify-content: flex-start;
  margin-right: 12px;
`;

export const CategoryCardIconContainer = styled(View)<{ categoryColor: string; isSelected?: boolean }>`
  width: 50px;
  height: 50px;
  border-radius: 50px;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
  overflow: hidden;
  background-color: ${props => props.categoryColor || 'transparent'};
  border-width: ${props => props.isSelected ? '3px' : '0px'};
  border-color: ${props => props.isSelected ? props.categoryColor : 'transparent'};
`;

export const CategoryCardName = styled(Text)`
  font-family: ${theme.FONT_FAMILY.REGULAR};
  font-size: ${theme.FONT_SIZE.SSM}px;
  color: ${theme.COLORS.PRIMARY};
  text-align: center;
  padding: 0;
  width: 100%;
`;
