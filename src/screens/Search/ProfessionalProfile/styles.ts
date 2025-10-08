import { SafeAreaView, View, ScrollView, Platform, Text, TouchableOpacity, Animated, Image } from 'react-native';
import styled from 'styled-components/native';
import { BlurView } from 'expo-blur';

// libs

// types

// styles
export const Container = styled(ScrollView)`
  flex: 1;
  padding-top: ${Platform.OS === 'android' ? 35 : 0}px;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
`;

export const HeaderButtons = styled(View)`
  position: absolute;
  top: ${Platform.OS === 'android' ? 50 : 60}px;
  left: 0;
  right: 0;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  z-index: 10;
`;

export const BackButton = styled(TouchableOpacity)`
  width: 48px;
  height: 48px;
  border-radius: 24px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 3;
`;

export const CoverImage = styled(Image)`
  width: 100%;
  height: 260px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
`;

export const AvatarContainer = styled(View)`
  width: 100%;
  z-index: 1;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  margin-top: -60px;
  flex-direction: row;
  margin-bottom: 20px;
`;

export const AvatarImage = styled(Image)`
  width: 110px;
  height: 110px;
  border-radius: 100px;
  position: absolute;

  top: -10px;
  z-index: 2;
  border: 4px solid ${({ theme }) => theme.COLORS.WHITE};
`;

export const ButtonsGroup = styled(View)`
  flex-direction: row;
  align-items: center;
  gap: 12px;
`;

export const LikeButton = styled(TouchableOpacity)<{ isSaved?: boolean }>`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 6px;
  border-radius: 100px;
  padding: 12px 20px;
  background-color: ${({ theme, isSaved }) => isSaved ? theme.COLORS.BLACK : theme.COLORS.WHITE};
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 3;
`;

export const LikeText = styled(Text)<{ isSaved?: boolean }>`
  font-family: ${({ theme }) => theme.FONT_FAMILY.MEDIUM};
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  color: ${({ theme, isSaved }) => isSaved ? theme.COLORS.WHITE : theme.COLORS.BLACK};
`;

export const ShareButton = styled(TouchableOpacity)`
  width: 48px;
  height: 48px;
  border-radius: 24px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 3;
`;

export const NameContainer = styled(View)`
  padding: 0 20px;
  margin-top: 20px;
`;

export const Name = styled(Text)`
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  font-size: ${({ theme }) => theme.FONT_SIZE.XXL}px;
  color: ${({ theme }) => theme.COLORS.GREY};
`;

export const Profession = styled(Text)`
  font-family: ${({ theme }) => theme.FONT_FAMILY.MEDIUM};
  font-size: ${({ theme }) => theme.FONT_SIZE.LG}px;
  color: ${({ theme }) => theme.COLORS.GREY_60};
  margin-top: 10px;
`;

export const DescriptionContainer = styled(View)`
  padding: 0 20px;
  margin-top: 24px;
`;

export const Description = styled(Text)`
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
  color: ${({ theme }) => theme.COLORS.GREY};
`;

export const ShowMoreButton = styled(TouchableOpacity)`
  margin-top: 8px;
  align-self: flex-start;
`;

export const ShowMoreText = styled(Text)`
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
  color: ${({ theme }) => theme.COLORS.SECONDARY};
`;

export const ButtonMessage = styled(TouchableOpacity)`
  margin: 0 auto;
  border-radius: 24px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.COLORS.GREY_20};
  padding: 8px 36px;
`;

export const ScrollViewContainer = styled(ScrollView)`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
`;

export const HeaderOptionsContainer = styled(View)`
  padding: 0 32px 20px 32px;
  margin-top: 40px;
`;

export const ServiceContainer = styled(View)`
  padding: 0px 20px 80px;
  flex: 1;
`;

export const RatingContainer = styled(View)`
  padding: 16px 20px 80px;
`;


export const StatsContainer = styled(View)`
  position: relative;
  margin-top: 12px;
`;

export const BlurBackground = styled(BlurView)`
  border-radius: 100px;
  overflow: hidden;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 8px;
  elevation: 5;
`;

export const StatsContent = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  padding: 20px 16px;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.COLORS.GREY_20}33;
`;

export const StatItem = styled(View)`
  align-items: center;
  min-width: 90px;
`;

export const StatValue = styled(Text)`
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  font-size: ${({ theme }) => theme.FONT_SIZE.LG}px;
  color: ${({ theme }) => theme.COLORS.GREY};
  text-align: center;
  width: 100%;
`;

export const StatLabel = styled(Text)`
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
  color: ${({ theme }) => theme.COLORS.GREY_60};
  margin-top: 4px;
  text-align: center;
  width: 100%;
`;

// Tab Separator Styles
export const TabSeparatorContainer = styled(View)`
  padding: 0 20px;
  margin-top: 28px;
  margin-bottom: 20px;
`;

// Sections within Reviews tab
export const SectionContainer = styled(View)`
  margin-bottom: 16px;
`;

export const SectionTitle = styled(Text)`
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  font-size: ${({ theme }) => theme.FONT_SIZE.LG}px;
  color: ${({ theme }) => theme.COLORS.GREY};
  margin-bottom: 8px;
`;

export const SectionText = styled(Text)`
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  color: ${({ theme }) => theme.COLORS.GREY_60};
  line-height: 22px;
`;

