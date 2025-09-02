import { View, Animated } from 'react-native';
import { Marker } from 'react-native-maps';
import styled from 'styled-components/native';

// libs

// types

// styles
export const ProfessionalMarker = styled(Marker)``;

export const CustomProfessionalMarker = styled(View)`
  width: 55px;
  height: 55px;

  border-radius: 100px;

  align-items: center;
  justify-content: center;
`;

export const MarkerImage = styled(Animated.Image)`
  width: 40px;
  height: 40px;

  border-width: 1px;
  border-color: ${({ theme }) => theme.COLORS.WHITE};
  border-radius: 50px;
`;
