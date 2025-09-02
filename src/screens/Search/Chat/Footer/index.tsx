import { useCallback, useState } from 'react';
import { InputBar } from './InputBar';
import * as S from './styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const Footer: React.FC = () => {
  const insents = useSafeAreaInsets();
  const [inputValue, setInputValue] = useState('');

  const handleSendImage = useCallback(() => {
    console.log('Enviando imagem');
  }, []);

  return (
    <S.Container insentBottom={insents.bottom}>
      <S.Header>
        <S.HeaderImage src="https://images.unsplash.com/photo-1599458348985-236f9b110da1?q=80&w=989&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />

        <S.HeaderDescriptionContainer>
          <S.HeaderSobTitle>Solicitando orçamento do serviço:</S.HeaderSobTitle>
          <S.HeaderServiceTitle>Unha das mãos</S.HeaderServiceTitle>
        </S.HeaderDescriptionContainer>
      </S.Header>

      <S.InputArea>
        <InputBar
          value={inputValue}
          onChange={setInputValue}
          onSend={handleSendImage}
          loading={false}
        />

        <S.SendButton>
          <S.IconSend name="send" size={20} />
        </S.SendButton>
      </S.InputArea>
    </S.Container>
  );
};
