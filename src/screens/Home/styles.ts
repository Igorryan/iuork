import styled from 'styled-components/native';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.GREY_10};
  padding: 24px 16px 16px 16px;
`;

export const Header = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

export const GreetingContainer = styled(View)`
`;

export const Title = styled(Text)`
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  font-size: 24px;
  color: #111;
`;

export const Subtitle = styled(Text)`
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-size: 14px;
  color: #6b7280;
  margin-top: 4px;
`;

export const Avatar = styled.Image`
  width: 45px;
  height: 45px;
  border-radius: 50px;
`;

export const SearchRow = styled(View)`
  flex-direction: row;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
`;

export const SearchBox = styled(TouchableOpacity)`
  flex: 1;
  height: 44px;
  border-radius: 22px;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  padding: 0 14px;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

export const SearchPlaceholder = styled(Text)`
  color: #9aa0a6;
  font-size: 14px;
`;

export const FilterButton = styled(TouchableOpacity)`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  background-color: #111;
  align-items: center;
  justify-content: center;
`;

export const SectionTitle = styled(Text)`
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  font-size: 18px;
  color: #111;
  margin: 8px 0 12px 0;
`;

export const Chips = styled(ScrollView)`
  margin-bottom: 16px;
`;

export const Chip = styled(TouchableOpacity)`
  padding: 8px 14px;
  border-radius: 999px;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  margin-right: 10px;
`;

export const ChipActive = styled(TouchableOpacity)`
  padding: 8px 14px;
  border-radius: 999px;
  background-color: #111;
  margin-right: 10px;
`;

export const ChipText = styled(Text)`
  color: #111;
  font-size: 12px;
`;

export const ChipTextActive = styled(Text)`
  color: #fff;
  font-size: 12px;
`;

export const Card = styled(View)`
  flex: 1;
  position: relative;
  border-radius: 24px;
  overflow: hidden;
  margin-bottom: 16px;
`;

export const CardImage = styled(Image)`
  width: 100%;
  height: 280px;
`;

export const FavoriteButton = styled(TouchableOpacity)`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 36px;
  height: 36px;
  border-radius: 18px;
  border-width: 1px;
  border-color: #ffffff55;
  align-items: center;
  justify-content: center;
  background-color: #00000022;
`;

export const CardGradient = styled(View)`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 110px;
  background-color: rgba(0,0,0,0.35);
`;

export const CardContent = styled(View)`
  position: absolute;
  left: 16px;
  right: 16px;
  bottom: 12px;
`;

export const Country = styled(Text)`
  color: #ffffffcc;
  font-size: 12px;
  margin-bottom: 2px;
`;

export const Place = styled(Text)`
  color: #fff;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  font-size: 20px;
`;

export const RatingRow = styled(View)`
  flex-direction: row;
  align-items: center;
  gap: 6px;
`;

export const RatingText = styled(Text)`
  color: #fff;
  font-size: 12px;
`;

export const ReviewsText = styled(Text)`
  color: #e5e7eb;
  font-size: 12px;
  margin-left: 6px;
`;

export const SeeMoreButton = styled(TouchableOpacity)`
  margin-top: 10px;
  height: 44px;
  background-color: #111111cc;
  border-radius: 999px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px 0 16px;
`;

export const SeeMoreText = styled(Text)`
  color: #fff;
  font-size: 14px;
`;

export const SeeMoreIcon = styled(View)`
  width: 36px;
  height: 36px;
  border-radius: 18px;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;

export const BottomBar = styled(View)`
  height: 68px;
  background-color: #111;
  border-radius: 24px;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding: 0 10px;
`;

export const BottomButton = styled(TouchableOpacity)`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;


