import { View, Image as RNImage, ScrollView, TouchableOpacity, Text } from 'react-native';
import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const Container = styled(View)`
  width: 100%;
  height: ${SCREEN_WIDTH * 0.75}px;
  background-color: ${({ theme }) => theme.COLORS.GREY_10};
  position: relative;
`;

export const CarouselImage = styled(RNImage)`
  width: ${SCREEN_WIDTH}px;
  height: ${SCREEN_WIDTH * 0.75}px;
`;

export const FullScreenContainer = styled(View)`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.95);
  justify-content: center;
  align-items: center;
`;

export const FullScreenImage = styled(RNImage)`
  width: ${SCREEN_WIDTH}px;
  height: 100%;
`;

export const CloseButton = styled(TouchableOpacity)`
  position: absolute;
  top: 50px;
  right: 20px;
  z-index: 10;
  width: 44px;
  height: 44px;
  border-radius: 22px;
  background-color: rgba(0, 0, 0, 0.5);
  align-items: center;
  justify-content: center;
`;

export const NavButton = styled(TouchableOpacity)<{ position: 'left' | 'right' }>`
  position: absolute;
  ${({ position }) => position}: 20px;
  top: 50%;
  z-index: 10;
  width: 44px;
  height: 44px;
  border-radius: 22px;
  background-color: rgba(0, 0, 0, 0.5);
  align-items: center;
  justify-content: center;
`;

export const CarouselCounter = styled(View)`
  position: absolute;
  bottom: 12px;
  right: 12px;
  background-color: rgba(0, 0, 0, 0.6);
  padding: 6px 12px;
  border-radius: 999px;
`;

export const CarouselCounterText = styled(Text)`
  font-family: ${({ theme }) => theme.FONT_FAMILY.MEDIUM};
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
  color: #FFFFFF;
`;

export const ImageCounter = styled(Text)`
  position: absolute;
  bottom: 40px;
  align-self: center;
  font-family: ${({ theme }) => theme.FONT_FAMILY.MEDIUM};
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  color: #FFFFFF;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 8px 16px;
  border-radius: 20px;
`;

