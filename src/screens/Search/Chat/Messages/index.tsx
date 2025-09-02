import { useEffect, useRef, useState } from 'react';
import { ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import * as S from './styles';

export interface IMessage {
  id: string;
  chat_id: string;
  sender_id: string;
  content: string;
  readAt: Date | null;
  createdAt: Date;
  imageUrl?: string | null;
}

// const professionalId = '4bd7ba23-989a-485b-a0bf-96fb6f7e03f8';
const userId = '888a91e0-7a9c-46e5-9671-3854a89a6914';

const messagesMock: IMessage[] = [
  {
    id: '384e215d-6214-4f80-9a4b-c3972f72608b',
    chat_id: 'e60ed87e-a338-486c-a30b-95c758fd385b',
    sender_id: '4bd7ba23-989a-485b-a0bf-96fb6f7e03f8',
    content:
      'Olá, tudo bem? Para realizar o orçamento deste serviço, você pode me enviar uma foto das suas unhas atualmente e a cor do esmalte que deseja por gentileza.',
    readAt: null,
    createdAt: new Date(),
    imageUrl: null,
  },
  {
    id: '5c49000a-6aae-4f8b-ba65-71fee30f61ee',
    chat_id: 'e60ed87e-a338-486c-a30b-95c758fd385b',
    sender_id: '888a91e0-7a9c-46e5-9671-3854a89a6914',
    content: 'Ah sim, vou te enviar, o esmalte eu quero vermelho..',
    readAt: null,
    createdAt: new Date(),
    imageUrl: null,
  },
  {
    id: 'efde0f87-9711-4ec8-b9a7-4f9edd4e9014',
    chat_id: 'e60ed87e-a338-486c-a30b-95c758fd385b',
    sender_id: '888a91e0-7a9c-46e5-9671-3854a89a6914',
    content:
      'Minha unha ta assim com bordas pontiagudas, mas gostaria de fazer com bordas mais arredondadas agora, pode ser?',
    readAt: null,
    createdAt: new Date(),
    imageUrl:
      'https://images.unsplash.com/photo-1641814250010-9887d86eedfd?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 'a6236f7a-693d-42f7-b059-14c304c555bb',
    chat_id: 'e60ed87e-a338-486c-a30b-95c758fd385b',
    sender_id: '4bd7ba23-989a-485b-a0bf-96fb6f7e03f8',
    content: 'Claro! Pode sim. Vou fechar seu orçamento aqui.',
    readAt: null,
    createdAt: new Date(),
    imageUrl: null,
  },
];

export const Messages: React.FC = () => {
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    // Rola automaticamente para o final ao carregar as mensagens
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 200);
  }, [messagesMock]);

  return (
    <S.Container ref={scrollViewRef}>
      {messagesMock.map((message) => (
        <S.MessageContainer fromUser={message.sender_id === userId} key={message.id}>
          {message.imageUrl ? (
            <S.MessageWithImageContainer>
              <ImageWithOriginalHeight img={message.imageUrl} />
              {message.content && (
                <S.Message style={{ marginTop: 10 }} fromUser={message.sender_id === userId}>
                  {message.content}
                </S.Message>
              )}
            </S.MessageWithImageContainer>
          ) : (
            <S.Message fromUser={message.sender_id === userId}>
              {message.content && (
                <S.Message fromUser={message.sender_id === userId}>{message.content}</S.Message>
              )}
            </S.Message>
          )}
        </S.MessageContainer>
      ))}
    </S.Container>
  );
};

const ImageWithOriginalHeight = ({ img }: { img: string }) => {
  const [imageHeight, setImageHeight] = useState(0);
  const widthScreen = (Dimensions.get('window').width * 72) / 100;

  useEffect(() => {
    // Obter dimensões da imagem original
    Image.getSize(img, (width, height) => {
      const screenWidth = widthScreen;
      const aspectRatio = height / width;
      setImageHeight(screenWidth * aspectRatio);
    });
  }, [img]);

  return (
    <TouchableOpacity activeOpacity={0.9}>
      <Image
        style={{
          borderRadius: 10,
          width: widthScreen,
          height: imageHeight,
        }}
        resizeMode="cover"
        source={{ uri: img }}
      />
    </TouchableOpacity>
  );
};
