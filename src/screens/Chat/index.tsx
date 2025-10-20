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

type ChatRouteProps = RouteProp<RootStackParamList, 'Chat'>;

export const Chat: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<ChatRouteProps>();
  const scrollViewRef = useRef<ScrollView>(null);
  const { user } = useAuth();
  
  const { professionalId, professionalName, professionalImage, serviceId, serviceName, sendBudgetRequest, sendBudgetAcceptanceMessage, budgetId } = route.params;

  console.log('🔍 [CHAT] Parâmetros da rota:', { 
    professionalId, 
    serviceName, 
    sendBudgetRequest, 
    sendBudgetAcceptanceMessage,
    budgetId 
  });

  const {
    messages,
    inputText,
    setInputText,
    isRecording,
    recordingDuration,
    isLoadingChat,
    chatId,
    sendTextMessage,
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
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [budgetStatus, setBudgetStatus] = useState<string | null>(null);
  const socket = useSocket();

  // Entrar na sala do cliente para receber notificações
  useEffect(() => {
    if (socket && user?.id) {
      console.log('🔌 [CHAT] Entrando na sala do cliente:', user.id);
      socket.emit('join-client', user.id);
    }
  }, [socket, user?.id]);

  // Carregar orçamentos do chat
  useEffect(() => {
    if (chatId) {
      loadBudgets();
    }
  }, [chatId]);

  const loadBudgets = async () => {
    if (!chatId) return;
    
    try {
      // Carregar todos os orçamentos deste chat (não filtrar por status)
      const chatBudgets = await getChatBudgets(chatId);
      setBudgets(chatBudgets);
      
      // Definir o status do orçamento atual
      if (chatBudgets.length > 0) {
        const currentBudget = chatBudgets[0]; // Pega o mais recente
        setBudgetStatus(currentBudget.status);
        console.log('📊 [CHAT] Status do orçamento:', currentBudget.status);
      }
    } catch (error) {
      console.error('Erro ao carregar orçamentos:', error);
    }
  };

  // Ouvir novos orçamentos via WebSocket
  useEffect(() => {
    if (socket && user?.id) {
      const handleNewBudget = (data: any) => {
        console.log('🔔 Novo orçamento recebido!', data);
        
        // Atualizar status do orçamento
        if (data.budgetId) {
          // Recarregar orçamentos para pegar o status atualizado
          loadBudgets();
        }
        
        // Atualizar ou adicionar orçamento à lista
        setBudgets((prev) => {
          // Verificar se já existe um orçamento com o mesmo ID
          const existingIndex = prev.findIndex(b => b.id === data.budgetId);
          
          const newBudget: Budget = {
            id: data.budgetId,
            chatId: data.chatId,
            serviceId: data.serviceId,
            price: data.price,
            description: data.description,
            status: 'PENDING',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            expiresAt: data.expiresAt,
          };
          
          if (existingIndex !== -1) {
            // Atualizar orçamento existente
            const updated = [...prev];
            updated[existingIndex] = newBudget;
            console.log('✅ Orçamento atualizado na lista');
            return updated;
          } else {
            // Adicionar novo orçamento
            console.log('✅ Novo orçamento adicionado à lista');
            return [newBudget, ...prev];
          }
        });
        
        // Só mostra alert se o preço foi definido (> 0)
        if (parseFloat(data.price) > 0) {
          Alert.alert(
            'Orçamento Recebido!',
            `${data.professionalName} enviou um orçamento de R$ ${parseFloat(data.price).toFixed(2).replace('.', ',')} para ${data.serviceName}.`
          );
        }
      };

      socket.on('new-budget', handleNewBudget);

      return () => {
        socket.off('new-budget', handleNewBudget);
      };
    }
  }, [socket, user?.id]);

  // Scroll para o final quando novas mensagens chegarem
  useEffect(() => {
    scrollToEnd();
  }, [messages]);

  // Enviar mensagem automática de solicitação de orçamento
  useEffect(() => {
    console.log('🔍 [CHAT] useEffect verificando:', { 
      sendBudgetRequest, 
      chatId, 
      budgetRequestSent, 
      messagesLength: messages.length,
      isLoadingChat
    });
    
    // Não precisa verificar chatId porque o sendTextMessage cria o chat automaticamente
    if (sendBudgetRequest && !budgetRequestSent && !isLoadingChat) {
      console.log('📤 [CHAT] Enviando mensagem automática de solicitação de orçamento...');
      // Aguardar o chat estar pronto e enviar mensagem automática
      const sendAutomaticMessage = async () => {
        const budgetMessage = `Olá! Gostaria de solicitar um orçamento para o serviço: ${serviceName}.`;
        
        console.log('📝 [CHAT] Definindo texto no input:', budgetMessage);
        // Definir o texto no input e aguardar um pouco para garantir que está renderizado
        setInputText(budgetMessage);
        
        // Aguardar para garantir que o chat e o texto estão prontos
        setTimeout(() => {
          console.log('📤 [CHAT] Chamando sendTextMessage...');
          sendTextMessage();
          setBudgetRequestSent(true);
          console.log('✅ [CHAT] Mensagem enviada e flag marcada');
        }, 1000);
      };
      
      sendAutomaticMessage();
    }
  }, [sendBudgetRequest, budgetRequestSent, serviceName, isLoadingChat]);

  // Enviar mensagem automática de aceitação de orçamento
  useEffect(() => {
    if (sendBudgetAcceptanceMessage && chatId && !budgetAcceptanceSent) {
      console.log('📤 Enviando mensagem automática de aceitação de orçamento...');
      // Aguardar o chat estar pronto e enviar mensagem automática
      const sendAcceptanceMessage = async () => {
        const acceptanceMessage = `Olá, gostaria de realizar o serviço: ${serviceName}.`;
        
        // Definir o texto no input e aguardar um pouco para garantir que está renderizado
        setInputText(acceptanceMessage);
        
        // Aguardar para garantir que o chat e o texto estão prontos
        setTimeout(() => {
          console.log('📤 Enviando mensagem de aceitação...');
          sendTextMessage();
          setBudgetAcceptanceSent(true);
        }, 1000);
      };
      
      sendAcceptanceMessage();
    }
  }, [sendBudgetAcceptanceMessage, chatId, budgetAcceptanceSent, serviceName]);

  const scrollToEnd = () => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  // Verificar se pode enviar mensagens (apenas se orçamento estiver PENDING ou ACCEPTED)
  const canSendMessages = budgetStatus === 'PENDING' || budgetStatus === 'ACCEPTED';

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

              {/* Orçamentos Recebidos */}
              {chatId && budgets.map((budget) => (
                <BudgetReceivedCard
                  key={budget.id}
                  budget={budget}
                  serviceName={serviceName}
                  professionalName={professionalName}
                />
              ))}

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
          <S.InputContainer>
            {!canSendMessages ? (
              <S.InputWrapper style={{ justifyContent: 'center', alignItems: 'center' }}>
                <S.DisabledText>
                  {budgetStatus === 'REJECTED' && 'Orçamento cancelado - Não é possível enviar mensagens'}
                  {budgetStatus === 'EXPIRED' && 'Orçamento expirado - Não é possível enviar mensagens'}
                  {!budgetStatus && 'Aguarde...'}
                </S.DisabledText>
              </S.InputWrapper>
            ) : isRecording ? (
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
    </SafeAreaView>
  );
};

