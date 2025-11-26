import axios from 'axios';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const envUrl = process.env.EXPO_PUBLIC_API_URL;

// iOS simulador acessa 127.0.0.1; Android emulador usa 10.0.2.2
const defaultLocalUrl = Platform.select({
  ios: 'http://127.0.0.1:3333',
  android: 'http://10.0.2.2:3333',
  default: 'http://127.0.0.1:3333',
});

export const api = axios.create({ baseURL: envUrl || defaultLocalUrl });

// Interceptor para adicionar token em todas as requisições
api.interceptors.request.use(
  async (config) => {
    // Se o token não estiver configurado nos headers, tentar buscar do AsyncStorage
    if (!config.headers.Authorization) {
      try {
        const token = await AsyncStorage.getItem('@client_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (error) {
        console.error('Erro ao buscar token do storage:', error);
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


