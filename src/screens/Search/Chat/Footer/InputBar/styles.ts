import styled from 'styled-components/native';
import { TextInput, TouchableOpacity, Image, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

export const TalkBar = styled(View)`
  flex-direction: column;
  padding: 8px;
  background-color: #e9e9e9;

  flex: 1;
  border-radius: 100px;
`;

export const InputContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  border-radius: 10px;
`;

export const Input = styled(TextInput)`
  flex: 1;
  font-size: 16px;
  padding: 10px;
  color: #333;
`;

export const PreviewImageContainer = styled(TouchableOpacity)``;

export const PreviewImage = styled(Image)`
  width: 35px;
  height: 35px;
  border-radius: 8px;
  margin-left: 10px;
`;

export const Actions = styled(View)`
  flex-direction: row;
  align-items: center;
  margin-left: 10px;
`;

export const ActionButton = styled(TouchableOpacity)`
  margin-left: 8px;
`;

export const ImageIcon = styled(Feather)`
  width: 22px;
  height: 22px;
  border-radius: 11px;
`;

export const AudioIcon = styled(Feather)`
  width: 22px;
  height: 22px;
  border-radius: 11px;

  margin-right: 8px;
`;
