import styled from 'styled-components/native';

// components
import { FlatList, View, Text, TouchableOpacity } from 'react-native';
import { ProfessionalCard } from '@components/ProfessionalCard';
import { Feather } from '@expo/vector-icons';

// types
import { Professional as IProfessional } from '../../../types/domain';

// styles
export const Container = styled(View)`
  flex: 1;
`;

export const ProfessionalsList = styled(FlatList<IProfessional>)`
  padding-top: 10px;
`;

export const ProfessionalCardCustom = styled(ProfessionalCard)`
  margin: 10px 20px 0;
`;

export const StatusEndList = styled(Text)`
  margin: 24px 0 114px;

  text-align: center;

  color: ${({ theme }) => theme.COLORS.GREY_40};
`;

export const ButtonMapContainer = styled(View)`
  align-items: center;
  bottom: 80px;
  height: 0;
`;

export const ButtonMap = styled(TouchableOpacity)`
  align-items: center;
  justify-content: center;
  flex-direction: row;

  width: 100px;

  height: 44px;

  border-radius: 100px;

  text-align: left;

  background-color: ${({ theme }) => theme.COLORS.BLACK};
`;

export const ButtonText = styled(Text)`
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
  text-align: center;

  color: ${({ theme }) => theme.COLORS.WHITE};
`;

export const Icon = styled(Feather)`
  color: ${({ theme }) => theme.COLORS.WHITE};

  margin-right: 10px;
`;
