# 🚀 Setup do Chat - Instalação de Dependências

## 📦 Instalar Dependência de Áudio

Para que o chat funcione completamente, você precisa instalar o `expo-av` para gravação e reprodução de áudio.

### Comando de Instalação

```bash
cd app
npx expo install expo-av
```

Ou se estiver usando yarn:

```bash
cd app
yarn add expo-av
```

## 🔧 Configuração iOS (se necessário)

Se estiver desenvolvendo para iOS, rode:

```bash
cd ios
pod install
cd ..
```

## ✅ Verificar Instalação

Após instalar, rode o projeto:

```bash
npm start
# ou
yarn start
```

## 🎯 Funcionalidades do Chat

✅ **Mensagens de Texto**
- Digite e envie mensagens
- Persistência com AsyncStorage
- Timestamps automáticos

✅ **Áudio**
- Grave mensagens de áudio
- Player de áudio com visualização de onda
- Contador de duração em tempo real
- Cancelar gravação

✅ **Imagens**
- Selecionar da galeria
- Tirar foto com câmera
- Exibir imagens no chat

✅ **Persistência**
- Mensagens salvas localmente
- Carregamento automático ao abrir o chat
- Histórico preservado

✅ **UX**
- Scroll automático para novas mensagens
- Indicador de gravação
- Estado vazio quando não há mensagens
- KeyboardAvoidingView para iOS/Android

## 📱 Permissões Necessárias

O app vai solicitar automaticamente as seguintes permissões quando necessário:

- 🎤 **Microfone** - Para gravar áudio
- 📷 **Câmera** - Para tirar fotos
- 🖼️ **Galeria** - Para selecionar imagens

## 🔑 Chave do AsyncStorage

As mensagens são salvas com a chave:
```
chat_{professionalId}_{serviceId}
```

Cada conversa com um profissional sobre um serviço específico tem seu próprio histórico.

