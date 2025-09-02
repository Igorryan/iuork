import { View, Text, Image, Dimensions } from 'react-native';
import styled from 'styled-components/native';

// libs

// types

// styles
export const Container = styled(View)``;

export const DisplayGrid = styled(View)`
  flex-direction: row;
  flex-wrap: wrap;

  padding: 0 18px 32px;
`;

export const PhotoGrid = styled(Image)`
  width: ${Dimensions.get('window').width / 3 - 18}px;
  height: ${Dimensions.get('window').width / 3 - 18}px;

  margin: 2px;

  border-radius: 10px;
`;

export const MoreView = styled(View)`
  align-items: center;
  justify-content: center;

  width: ${Dimensions.get('window').width / 3 - 18}px;
  height: ${Dimensions.get('window').width / 3 - 18}px;

  background-color: #15151580;
  border-radius: 10px;
  margin: 2px;

  position: absolute;
`;

export const MoreViewPhotoQuantityText = styled(Text)`
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-size: ${({ theme }) => theme.FONT_SIZE.LG}px;
  color: ${({ theme }) => theme.COLORS.WHITE};
`;
