import { SafeAreaView, View, ScrollView, Platform, Text, TouchableOpacity, Animated } from 'react-native';
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


export const Content = styled(SafeAreaView)`
  flex: 1;
  background-color: #EDEDED;
`;

export const HeaderContainer = styled(View)`
  height: 400px;
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
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
  padding: 0px 8px 80px;

  flex: 1;
`;

export const RatingContainer = styled(View)`
  padding: 16px 20px 80px;
`;


export const StatsContainer = styled(View)`
  padding: 0 20px;
  margin-top: -40px;
`;

export const BlurBackground = styled(BlurView)`
  border-radius: 16px;
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

