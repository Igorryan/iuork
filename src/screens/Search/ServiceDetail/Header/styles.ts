import { TouchableOpacity, Text, Image, Platform } from 'react-native';
import styled from 'styled-components/native';

// libs
import { Feather } from '@expo/vector-icons';

// types

// styles
export const Container = styled(TouchableOpacity)`
  left: 0;

  width: 100%;

  z-index: 1;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  padding: 6px 20px;

  background-color: ${({ theme }) => theme.COLORS.WHITE};

  padding-top: ${Platform.OS === 'android' ? 40 : 0}px;
`;

export const BackIcon = styled(Feather)``;

export const ProfessionalNameText = styled(Text)`
  margin: 0 16px;

  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
  color: ${({ theme }) => theme.COLORS.GREY};
`;

export const ProfessionalAvatar = styled(Image)`
  width: 36px;
  height: 36px;

  border-radius: 50px;
`;
