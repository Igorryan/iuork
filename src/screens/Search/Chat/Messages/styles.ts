import { ScrollView, Text, View, Image } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled(ScrollView)`
  flex: 1;
  padding: 0 10px;
`;

export const MessageContainer = styled(View)<{ fromUser: boolean }>`
  background-color: ${(props) => (props.fromUser ? '#e2ffd3' : '#fff')};
  align-self: ${(props) => (props.fromUser ? 'flex-end' : 'flex-start')};
  border-radius: 10px;
  border-bottom-right-radius: ${(props) => (props.fromUser ? '0' : '10px')};
  border-bottom-left-radius: ${(props) => (props.fromUser ? '10px' : '0')};
  max-width: 82%;
  margin-bottom: 10px;
  padding: 10px;
`;

export const MessageWithImageContainer = styled(View)``;

export const MessageImage = styled(Image)`
  width: 100%;
  object-fit: contain;
`;

export const Message = styled(Text)<{ fromUser: boolean }>`
  overflow: hidden;
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
`;
