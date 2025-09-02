import { View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import styled from 'styled-components/native';

// libs

// types

// styles

export const Container = styled(View)`
  flex: 1;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
`;

export const Map = styled(MapView)`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.BLACK};
`;

export const UserMarker = styled(Marker)``;

export const CustomUserMarker = styled(View)`
  align-items: center;
  justify-content: center;

  width: 32px;
  height: 32px;

  border-radius: 100px;

  background-color: ${({ theme }) => theme.COLORS.SECONDARY}20;

  border-width: 1px;
  border-color: ${({ theme }) => theme.COLORS.SECONDARY};
`;

export const CircleCenter = styled(View)`
  width: 22px;
  height: 22px;

  border-width: 2px;
  border-color: #fff;

  border-radius: 100px;

  background-color: ${({ theme }) => theme.COLORS.SECONDARY};
`;
