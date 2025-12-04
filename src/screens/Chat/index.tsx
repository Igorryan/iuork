import React, { useState, useRef, useEffect } from 'react';
import { KeyboardAvoidingView, Platform, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import * as S from './styles';
import { RootStackParamList } from '@routes/stack.routes';
import { useChat } from '@hooks/useChat';
import { useAuth } from '@hooks/auth';
import { AudioPlayer } from '@components/AudioPlayer';
import { BudgetReceivedCard } from '@components/BudgetReceivedCard';
import { getChatBudgets, Budget } from '@api/callbacks/budget';
import { useSocket } from '@hooks/useSocket';
import { mergeChatItems, ChatItem } from '@functions/mergeChatItems';

type ChatRouteProps = RouteProp<RootStackParamList, 'Chat'>;

export const Chat: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<ChatRouteProps>();
  const scrollViewRef = useRef<ScrollView>(null);
  const { user } = useAuth();

  const { professionalId, professionalName, professionalImage, serviceId, serviceName, sendBudgetRequest, sendBudgetAcceptanceMessage, budgetId } = route.params;

  const {
    messages,
    inputText,
    setInputText,
    isRecording,
    recordingDuration,
    isLoadingChat,
    chatId,
    sendTextMessage,
    sendMessageDirectly,
    pickImage,
    takePhoto,
    startRecording,
    stopRecording,
    cancelRecording,
  } = useChat({
    professionalId,
    serviceId,
    userId: user?.id || '',
    budgetId
  });

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

  const [budgetRequestSent, setBudgetRequestSent] = useState(false);
  const [budgetAcceptanceSent, setBudgetAcceptanceSent] = useState(false);
  const [currentBudget, setCurrentBudget] = useState<Budget | null>(null);
  const [budgetStatus, setBudgetStatus] = useState<string | null>(null);
  const socket = useSocket();

  // Entrar na sala do cliente para receber notificações
  useEffect(() => {
    if (socket && user?.id) {
      socket.emit('join-client', user.id);
    }
  }, [socket, user?.id]);

  // Carregar orçamento específico do chat
  useEffect(() => {
    if (chatId) {
      loadBudget();
    }
  }, [chatId, budgetId]);

  const loadBudget = async () => {
    if (!chatId) return;

    try {
      // Carregar todos os orçamentos deste chat
      const chatBudgets = await getChatBudgets(chatId);

      if (chatBudgets.length > 0) {
        // Se temos um budgetId específico, usar ele, senão pegar o mais recente
        const budget = budgetId
          ? chatBudgets.find(b => b.id === budgetId) || chatBudgets[0]
          : chatBudgets[0];

        setCurrentBudget(budget);
        setBudgetStatus(budget.status);
      } else {
        // Resetar se não houver orçamentos
        setCurrentBudget(null);
        setBudgetStatus(null);
      }
    } catch (error) {
      console.error('Erro ao carregar orçamento:', error);
      setCurrentBudget(null);
      setBudgetStatus(null);
    }
  };

  // Ouvir novos orçamentos via WebSocket
  useEffect(() => {
    if (socket && user?.id) {
      const handleNewBudget = (data: any) => {
        // Verificar se é para este chat/serviço
        if ((chatId && data.chatId === chatId) || (serviceId && data.serviceId === serviceId)) {
          // Sempre recarregar o orçamento quando receber evento
          setTimeout(() => {
            loadBudget();
          }, 500);

          // Só mostra alert se o preço foi definido (> 0)
          if (parseFloat(data.price) > 0) {
            Alert.alert(
              'Orçamento Recebido!',
              `${data.professionalName} enviou um orçamento de R$ ${parseFloat(data.price).toFixed(2).replace('.', ',')} para ${data.serviceName}.`
            );
          }
        }
      };

      socket.on('new-budget', handleNewBudget);

      return () => {
        socket.off('new-budget', handleNewBudget);
      };
    }
  }, [socket, user?.id, chatId, serviceId]);

  // Scroll para o final quando novas mensagens ou orçamento chegarem
  useEffect(() => {
    scrollToEnd();
  }, [messages, currentBudget]);

  // Enviar mensagem automática de solicitação de orçamento
  useEffect(() => {
    // Não precisa verificar chatId porque o sendMessageDirectly cria o chat automaticamente
    if (sendBudgetRequest && !budgetRequestSent && !isLoadingChat) {
      // Aguardar o chat estar pronto e enviar mensagem automática
      const sendAutomaticMessage = async () => {
        const budgetMessage = `Olá! Gostaria de solicitar um orçamento para o serviço: ${serviceName}.`;

        // Enviar mensagem diretamente sem preencher o input
        await sendMessageDirectly(budgetMessage);
        setBudgetRequestSent(true);
      };

      sendAutomaticMessage();
    }
  }, [sendBudgetRequest, budgetRequestSent, serviceName, isLoadingChat]);

  // Enviar mensagem automática de aceitação de orçamento
  useEffect(() => {
    if (sendBudgetAcceptanceMessage && chatId && !budgetAcceptanceSent) {
      // Aguardar o chat estar pronto e enviar mensagem automática
      const sendAcceptanceMessage = async () => {
        const acceptanceMessage = `Olá, gostaria de realizar o serviço: ${serviceName}.`;

        // Enviar mensagem diretamente sem preencher o input
        await sendMessageDirectly(acceptanceMessage);
        setBudgetAcceptanceSent(true);
      };

      sendAcceptanceMessage();
    }
  }, [sendBudgetAcceptanceMessage, chatId, budgetAcceptanceSent, serviceName, sendMessageDirectly]);

  const scrollToEnd = () => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  // Mesclar mensagens e orçamento em uma lista ordenada cronologicamente
  const chatItems = mergeChatItems(messages, currentBudget);

  // Sempre permitir enviar mensagens, independente do status do orçamento
  const canSendMessages = true;

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
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >
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

              {/* Estado vazio */}
              {chatItems.length === 0 && (
                <S.EmptyStateContainer>
                  <S.EmptyStateText>
                    O orçamento foi iniciado com sucesso!
                  </S.EmptyStateText>
                </S.EmptyStateContainer>
              )}

              {/* Lista unificada de mensagens e orçamento ordenada cronologicamente */}
              {chatItems.map((item: ChatItem) => {
                if (item.type === 'message' && item.message) {
                  const msg = item.message;
                  return (
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
                  );
                }

                if (item.type === 'budget' && item.budget) {
                  const budget = item.budget;
                  // Só mostrar se o preço foi definido (> 0)
                  if (parseFloat(budget.price) > 0) {
                    return (
                      <S.MessageWrapper key={`budget-${budget.id}`} isMine={false}>
                        <BudgetReceivedCard
                          budget={budget}
                          serviceName={serviceName}
                          professionalName={professionalName}
                          onContract={() => {
                            Alert.alert(
                              'Contratar Serviço',
                              `Deseja contratar o serviço ${serviceName} por R$ ${parseFloat(budget.price).toFixed(2).replace('.', ',')}?`,
                              [
                                {
                                  text: 'Cancelar',
                                  style: 'cancel',
                                },
                                {
                                  text: 'Contratar',
                                  onPress: () => {
                                    // Aqui você pode adicionar a lógica para contratar o serviço
                                    Alert.alert('Sucesso', 'Serviço contratado com sucesso!');
                                  },
                                },
                              ]
                            );
                          }}
                        />
                        <S.MessageTime>
                          {new Date(budget.updatedAt).toLocaleTimeString('pt-BR', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </S.MessageTime>
                      </S.MessageWrapper>
                    );
                  }
                }

                return null;
              })}

            </S.MessagesList>
          </S.MessagesContainer>

          {/* Input sempre visível */}
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
                  editable={canSendMessages}
                />
                <S.InputActions>
                  <S.InputButton onPress={handleAttachment} disabled={!canSendMessages}>
                    <Ionicons name="attach-outline" size={24} color={canSendMessages ? "#626263" : "#D5D5D4"} />
                  </S.InputButton>
                  <S.InputButton
                    onPress={handleMicPress}
                    onLongPress={handleMicLongPress}
                    delayLongPress={500}
                    disabled={!canSendMessages}
                  >
                    <Ionicons
                      name={isRecording ? "stop-circle" : "mic-outline"}
                      size={24}
                      color={isRecording ? "#FF7D7D" : (canSendMessages ? "#626263" : "#D5D5D4")}
                    />
                  </S.InputButton>
                </S.InputActions>
              </S.InputWrapper>
            )}

            {!isRecording && canSendMessages && (
              <S.SendButton
                onPress={handleSend}
                disabled={!inputText.trim()}
                style={{ opacity: inputText.trim() ? 1 : 0.5 }}
              >
                <Ionicons name="send" size={20} color="#FFF" />
              </S.SendButton>
            )}

            {isRecording && canSendMessages && (
              <S.SendButton onPress={stopRecording}>
                <Ionicons name="checkmark" size={24} color="#FFF" />
              </S.SendButton>
            )}
          </S.InputContainer>
        </S.Container>
      </KeyboardAvoidingView>
    </SafeAreaView >
  );
};

