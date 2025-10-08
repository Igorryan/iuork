import { useState, useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { Audio } from 'expo-av';
import { Alert } from 'react-native';

export interface ChatMessage {
  id: string;
  text?: string;
  audioUrl?: string;
  audioUri?: string;
  audioDuration?: number;
  imageUrl?: string;
  imageUri?: string;
  time: string;
  isMine: boolean;
  timestamp: number;
}

interface UseChatProps {
  professionalId: string;
  serviceId: string;
}

export const useChat = ({ professionalId, serviceId }: UseChatProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const recordingRef = useRef<Audio.Recording | null>(null);
  const durationIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const chatKey = `chat_${professionalId}_${serviceId}`;

  // Carregar mensagens do AsyncStorage
  useEffect(() => {
    loadMessages();
  }, []);

  // Salvar mensagens no AsyncStorage sempre que mudar
  useEffect(() => {
    if (messages.length > 0) {
      saveMessages();
    }
  }, [messages]);

  const loadMessages = async () => {
    try {
      const storedMessages = await AsyncStorage.getItem(chatKey);
      if (storedMessages) {
        setMessages(JSON.parse(storedMessages));
      }
    } catch (error) {
      console.error('Erro ao carregar mensagens:', error);
    }
  };

  const saveMessages = async () => {
    try {
      await AsyncStorage.setItem(chatKey, JSON.stringify(messages));
    } catch (error) {
      console.error('Erro ao salvar mensagens:', error);
    }
  };

  const generateMessageId = () => {
    return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  };

  const getFormattedTime = () => {
    const now = new Date();
    return now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  // Enviar mensagem de texto
  const sendTextMessage = () => {
    if (!inputText.trim()) return;

    const newMessage: ChatMessage = {
      id: generateMessageId(),
      text: inputText.trim(),
      time: getFormattedTime(),
      isMine: true,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputText('');
  };

  // Selecionar e enviar imagem
  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert('Permissão negada', 'Precisamos de permissão para acessar suas fotos.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        const newMessage: ChatMessage = {
          id: generateMessageId(),
          imageUri: result.assets[0].uri,
          imageUrl: result.assets[0].uri, // Em produção, fazer upload e usar URL
          time: getFormattedTime(),
          isMine: true,
          timestamp: Date.now(),
        };

        setMessages((prev) => [...prev, newMessage]);
      }
    } catch (error) {
      console.error('Erro ao selecionar imagem:', error);
      Alert.alert('Erro', 'Não foi possível selecionar a imagem.');
    }
  };

  // Tirar foto
  const takePhoto = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert('Permissão negada', 'Precisamos de permissão para acessar a câmera.');
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        const newMessage: ChatMessage = {
          id: generateMessageId(),
          imageUri: result.assets[0].uri,
          imageUrl: result.assets[0].uri,
          time: getFormattedTime(),
          isMine: true,
          timestamp: Date.now(),
        };

        setMessages((prev) => [...prev, newMessage]);
      }
    } catch (error) {
      console.error('Erro ao tirar foto:', error);
      Alert.alert('Erro', 'Não foi possível tirar a foto.');
    }
  };

  // Iniciar gravação de áudio
  const startRecording = async () => {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert('Permissão negada', 'Precisamos de permissão para gravar áudio.');
        return;
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );

      recordingRef.current = recording;
      setIsRecording(true);
      setRecordingDuration(0);

      // Contador de duração
      durationIntervalRef.current = setInterval(() => {
        setRecordingDuration((prev) => prev + 1);
      }, 1000);
    } catch (error) {
      console.error('Erro ao iniciar gravação:', error);
      Alert.alert('Erro', 'Não foi possível iniciar a gravação.');
    }
  };

  // Parar gravação e enviar
  const stopRecording = async () => {
    try {
      if (!recordingRef.current) return;

      if (durationIntervalRef.current) {
        clearInterval(durationIntervalRef.current);
        durationIntervalRef.current = null;
      }

      await recordingRef.current.stopAndUnloadAsync();
      const uri = recordingRef.current.getURI();

      if (uri && recordingDuration > 0) {
        const newMessage: ChatMessage = {
          id: generateMessageId(),
          audioUri: uri,
          audioUrl: uri,
          audioDuration: recordingDuration,
          time: getFormattedTime(),
          isMine: true,
          timestamp: Date.now(),
        };

        setMessages((prev) => [...prev, newMessage]);
      }

      recordingRef.current = null;
      setIsRecording(false);
      setRecordingDuration(0);
    } catch (error) {
      console.error('Erro ao parar gravação:', error);
      Alert.alert('Erro', 'Não foi possível finalizar a gravação.');
    }
  };

  // Cancelar gravação
  const cancelRecording = async () => {
    try {
      if (!recordingRef.current) return;

      if (durationIntervalRef.current) {
        clearInterval(durationIntervalRef.current);
        durationIntervalRef.current = null;
      }

      await recordingRef.current.stopAndUnloadAsync();
      recordingRef.current = null;
      setIsRecording(false);
      setRecordingDuration(0);
    } catch (error) {
      console.error('Erro ao cancelar gravação:', error);
    }
  };

  // Limpar chat
  const clearChat = async () => {
    try {
      await AsyncStorage.removeItem(chatKey);
      setMessages([]);
    } catch (error) {
      console.error('Erro ao limpar chat:', error);
    }
  };

  // Deletar mensagem
  const deleteMessage = async (messageId: string) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== messageId));
  };

  return {
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
    clearChat,
    deleteMessage,
  };
};

