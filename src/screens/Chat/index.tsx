import React, { useState, useRef, useEffect } from 'react';
import { KeyboardAvoidingView, Platform, Alert, ScrollView } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import * as S from './styles';
import { RootStackParamList } from '@routes/stack.routes';
import { useChat } from '@hooks/useChat';
import { AudioPlayer } from '@components/AudioPlayer';

type ChatRouteProps = RouteProp<RootStackParamList, 'Chat'>;

export const Chat: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<ChatRouteProps>();
  const scrollViewRef = useRef<ScrollView>(null);
  
  const { professionalName, professionalImage, serviceId, serviceName } = route.params;
  
  // Extrair professionalId do serviceId ou usar um mock
  const professionalId = serviceId.split('_')[0] || 'prof_1';

  const {
    messages,
    inputText,
    setInputText,
    isRecording,
    recordingDuration,
    sendTextMessage,
    pickImage,
    takePhoto,
    startRecording,
    stopRecording,
    cancelRecording,
  } = useChat({ professionalId, serviceId });

  const [budgetInfo] = useState({
    serviceName: serviceName || 'Unha das Mãos',
    price: 35.0,
    date: new Date().toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }),
  });

  // Scroll para o final quando novas mensagens chegarem
  useEffect(() => {
    scrollToEnd();
  }, [messages]);

  const scrollToEnd = () => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const handleSend = () => {
    if (inputText.trim()) {
      sendTextMessage();
      scrollToEnd();
    }
  };

  const handleAttachment = () => {
    Alert.alert(
      'Adicionar anexo',
      'Escolha uma opção',
      [
        {
          text: 'Câmera',
          onPress: takePhoto,
        },
        {
          text: 'Galeria',
          onPress: pickImage,
        },
        {
          text: 'Cancelar',
          style: 'cancel',
        },
      ]
    );
  };

  const handleMicPress = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const handleMicLongPress = () => {
    if (isRecording) {
      Alert.alert(
        'Cancelar gravação?',
        'Deseja cancelar a gravação atual?',
        [
          {
            text: 'Não',
            style: 'cancel',
          },
          {
            text: 'Sim',
            onPress: cancelRecording,
            style: 'destructive',
          },
        ]
      );
    }
  };

  const formatRecordingTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <S.Container>
      {/* Header */}
      <S.Header>
        <S.BackButton onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#000" />
        </S.BackButton>
        
        <S.HeaderContent>
          <S.Avatar source={{ uri: professionalImage }} />
          <S.HeaderInfo>
            <S.HeaderName>{professionalName}</S.HeaderName>
            <S.HeaderStatus>Online</S.HeaderStatus>
          </S.HeaderInfo>
        </S.HeaderContent>

        <S.HeaderActions>
          <S.HeaderButton>
            <Ionicons name="call-outline" size={22} color="#000" />
          </S.HeaderButton>
          <S.HeaderButton>
            <Ionicons name="ellipsis-vertical" size={22} color="#000" />
          </S.HeaderButton>
        </S.HeaderActions>
      </S.Header>

      {/* Messages */}
      <S.MessagesContainer>
        <S.MessagesList
          ref={scrollViewRef}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
          onContentSizeChange={scrollToEnd}
        >
          {/* Budget Request - sempre no início */}
          <S.BudgetRequestWrapper>
            <S.BudgetRequestHeader>
              <S.ServiceIcon source={{ uri: professionalImage }} />
              <S.BudgetRequestTitle>
                Você está solicitando orçamento do serviço:{'\n'}
                <S.BudgetServiceName>{budgetInfo.serviceName}</S.BudgetServiceName>
              </S.BudgetRequestTitle>
            </S.BudgetRequestHeader>
          </S.BudgetRequestWrapper>

          {/* Mensagens do chat */}
          {messages.map((msg) => (
            <S.MessageWrapper key={msg.id} isMine={msg.isMine}>
              {msg.audioUrl || msg.audioUri ? (
                <AudioPlayer
                  audioUri={msg.audioUri || msg.audioUrl || ''}
                  duration={msg.audioDuration}
                  isMine={msg.isMine}
                />
              ) : msg.imageUrl || msg.imageUri ? (
                <S.ImageMessageContainer>
                  <S.MessageImage source={{ uri: msg.imageUri || msg.imageUrl }} />
                  {msg.text && (
                    <S.MessageBubble isMine={msg.isMine}>
                      <S.MessageText isMine={msg.isMine}>{msg.text}</S.MessageText>
                    </S.MessageBubble>
                  )}
                </S.ImageMessageContainer>
              ) : msg.text ? (
                <S.MessageBubble isMine={msg.isMine}>
                  <S.MessageText isMine={msg.isMine}>{msg.text}</S.MessageText>
                </S.MessageBubble>
              ) : null}
              <S.MessageTime>{msg.time}</S.MessageTime>
            </S.MessageWrapper>
          ))}

          {/* Estado vazio */}
          {messages.length === 0 && (
            <S.EmptyStateContainer>
              <S.EmptyStateText>
                Envie uma mensagem para iniciar a conversa
              </S.EmptyStateText>
            </S.EmptyStateContainer>
          )}
        </S.MessagesList>
      </S.MessagesContainer>

      {/* Input */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <S.InputContainer>
          {isRecording ? (
            <S.RecordingContainer>
              <S.RecordingDot />
              <S.RecordingText>Gravando... {formatRecordingTime(recordingDuration)}</S.RecordingText>
              <S.CancelRecordingButton onPress={cancelRecording}>
                <S.CancelRecordingText>Cancelar</S.CancelRecordingText>
              </S.CancelRecordingButton>
            </S.RecordingContainer>
          ) : (
            <S.InputWrapper>
              <S.Input
                placeholder="Digite aqui..."
                value={inputText}
                onChangeText={setInputText}
                multiline
                maxLength={1000}
              />
              <S.InputActions>
                <S.InputButton onPress={handleAttachment}>
                  <Ionicons name="attach-outline" size={24} color="#626263" />
                </S.InputButton>
                <S.InputButton 
                  onPress={handleMicPress}
                  onLongPress={handleMicLongPress}
                  delayLongPress={500}
                >
                  <Ionicons 
                    name={isRecording ? "stop-circle" : "mic-outline"} 
                    size={24} 
                    color={isRecording ? "#FF7D7D" : "#626263"} 
                  />
                </S.InputButton>
              </S.InputActions>
            </S.InputWrapper>
          )}
          
          {!isRecording && (
            <S.SendButton 
              onPress={handleSend}
              disabled={!inputText.trim()}
              style={{ opacity: inputText.trim() ? 1 : 0.5 }}
            >
              <Ionicons name="send" size={20} color="#FFF" />
            </S.SendButton>
          )}

          {isRecording && (
            <S.SendButton onPress={stopRecording}>
              <Ionicons name="checkmark" size={24} color="#FFF" />
            </S.SendButton>
          )}
        </S.InputContainer>
      </KeyboardAvoidingView>
    </S.Container>
  );
};

