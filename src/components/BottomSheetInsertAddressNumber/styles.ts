import styled from 'styled-components/native';
import { TextInput } from 'react-native-paper';
import BottomSheet from '@gorhom/bottom-sheet';

export const Shadow = styled.View`
  flex: 1;
  width: 100%;
  top: 0;
  left: 0;
  height: 100%;
  position: absolute;
  background-color: ${({ theme }) => theme.COLORS.SHADOW};
  z-index: -1;
`;

export const BottomSheetContainer = styled(BottomSheet)`
  width: 100%;
  elevation: 8;
  shadow-color: rgba(0, 0, 0, 1);
  shadow-offset: 0px -4px;
  shadow-opacity: 0.25;
  shadow-radius: 16px;
  border-radius: 10px 10px 0px 0px;
  flex: 1;
`;

export const Content = styled.View`
  flex: 1;
  padding: 0 24px;
  align-items: center;
  width: 100%;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  margin: 16px 0 24px;
`;

export const AddressDetailsContainer = styled.View`
  justify-content: center;
  align-items: center;
`;

export const StreetAndNumberContainer = styled.View`
  flex-direction: row;
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  color: ${({ theme }) => theme.COLORS.BLACK};
`;

export const StreetText = styled.Text`
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  color: ${({ theme }) => theme.COLORS.BLACK};
`;

export const NumberText = styled.Text`
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  color: ${({ theme }) => theme.COLORS.BLACK};
`;

export const RestOfAddressText = styled.Text`
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-size: ${({ theme }) => theme.FONT_SIZE.SSM}px;
  color: ${({ theme }) => theme.COLORS.GREY_60};
  margin-top: 2px;
`;

export const AddressWithoutNumberText = styled.Text`
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
  color: ${({ theme }) => theme.COLORS.SECONDARY};

  margin-top: 24px;
`;

export const NumberInput = styled(TextInput).attrs(({ theme }) => ({
  outlineStyle: {
    borderColor: theme.COLORS.GREY_20,
    borderWidth: 1,
  },
  activeOutlineColor: theme.COLORS.GREY_80,
  contentStyle: {
    fontSize: theme.FONT_SIZE.SM,
  },
}))`
  width: 140px;
  height: 40px;

  margin: 24px 0 32px 0;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
`;
