import React, { useState } from 'react';
import { ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as S from './styles';

interface IMessageProps {
  message: string;
  image: string | null;
}

interface InputBarProps {
  value: string;
  onChange: (value: string) => void;
  onSend: (message: IMessageProps) => void;
  loading: boolean;
}

export const InputBar: React.FC<InputBarProps> = ({ value, onChange, onSend, loading }) => {
  const [image, setImage] = useState<string | null>(null);

  const handleImagePicker = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('É necessário permitir acesso às suas imagens.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      mediaTypes: 'Images' as any, // Força o tipo caso a definição de tipo esteja incorreta
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri); // Adapta para a estrutura retornada pelo ImagePicker
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSend = () => {
    onSend({ message: value, image });
    setImage(null);
    onChange('');
  };

  return (
    <S.TalkBar>
      <S.InputContainer>
        <S.Input value={value} onChangeText={onChange} placeholder="Digite aqui..." multiline />

        <S.Actions>
          {loading ? (
            <ActivityIndicator size="small" color="#66d37a" />
          ) : image ? (
            <S.PreviewImageContainer onPress={handleImagePicker}>
              <S.PreviewImage source={{ uri: image }} />
            </S.PreviewImageContainer>
          ) : (
            <S.ActionButton onPress={handleImagePicker}>
              <S.ImageIcon name="image" size={20} color={'#000000'} />
            </S.ActionButton>
          )}

          <S.ActionButton>
            <S.AudioIcon name="mic" size={20} />
          </S.ActionButton>
        </S.Actions>
      </S.InputContainer>
    </S.TalkBar>
  );
};
