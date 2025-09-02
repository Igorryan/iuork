import {
  TouchableOpacity,
  View,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from 'react-native';
import styled from 'styled-components/native';

// libs

// types

// styles
export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
`;

export const Content = styled(ScrollView)``;

export const Divider = styled(View)`
  width: 100%;
  height: 8px;

  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
`;

export const Header = styled(View)`
  width: 100%;

  background-color: ${({ theme }) => theme.COLORS.WHITE};
`;

export const DisplayCarousel = styled(View)`
  margin-top: -20px;
  padding-bottom: 10px;
`;

export const PhotoCarousel = styled(Image)`
  width: 100%;
  height: 100%;

  border-radius: 10px;
`;

export const DisplayFilm = styled(View)``;

export const PhotoFilm = styled(Image)`
  width: ${Dimensions.get('window').width}px;
  height: ${Dimensions.get('window').width}px;
  margin-top: 8px;
`;

export const ViewMore = styled(TouchableOpacity)`
  align-items: center;

  padding: 32px 0;
`;

export const ViewMoreText = styled(Text)`
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
  color: ${({ theme }) => theme.COLORS.GREY};

  text-decoration: underline;
`;

export const Assessments = styled(View)`
  padding: 0 20px;
`;
