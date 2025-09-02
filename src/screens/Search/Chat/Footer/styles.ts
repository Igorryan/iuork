import { Text, View, Image } from 'react-native';
import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';

export const Container = styled(View)<{ insentBottom: number }>`
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  margin-bottom: ${({ insentBottom }) => `-${insentBottom}px`};
  padding: 20px;
  padding-bottom: ${({ insentBottom }) => `${insentBottom}px`};
`;

export const Header = styled(View)`
  flex-direction: row;
  align-items: center;
`;

export const HeaderImage = styled(Image)`
  width: 35px;
  height: 35px;

  object-fit: cover;
  border-radius: 8px;
  margin-right: 8px;
`;

export const HeaderDescriptionContainer = styled(View)``;

export const HeaderSobTitle = styled(Text)`
  color: ${({ theme }) => theme.COLORS.GREY_60};
  margin-bottom: 2px;
`;

export const HeaderServiceTitle = styled(Text)`
  color: ${({ theme }) => theme.COLORS.BLACK};
  font-weight: 600;
`;

export const InputArea = styled(View)`
  align-items: center;
  flex-direction: row;
  width: 100%;

  margin-top: 20px;
`;

export const SendButton = styled(View)`
  align-items: center;
  justify-content: center;

  margin-left: 20px;

  height: 50px;
  width: 50px;

  border-radius: 50%;

  background-color: ${({ theme }) => theme.COLORS.BLACK};
`;

export const IconSend = styled(Feather)`
  color: ${({ theme }) => theme.COLORS.WHITE};
  margin-left: -2px;
  margin-bottom: -2px;
`;
