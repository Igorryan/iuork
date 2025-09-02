import React, { useMemo } from 'react';
import { TextInput } from 'react-native';
import styled from 'styled-components/native';
import { ExpansiveView } from '@components/ExpansiveView';

type WhatProps = {
  isActive: boolean;
  onPress(): void;
  value: string;
  setValue(text: string): void;
};

export const What: React.FC<WhatProps> = ({ isActive, onPress, value, setValue }) => {
  const minimizedValue = useMemo(() => (value ? value : 'O que você precisa?'), [value]);

  return (
    <ExpansiveView
      isActive={isActive}
      onPress={onPress}
      minimized={{ title: 'Profissional/Serviço', value: minimizedValue }}
      maximized={{ title: 'O que você precisa?' }}
    >
      <InputContainer>
        <StyledInput
          placeholder="Buscar por profissional ou serviço"
          value={value}
          onChangeText={setValue}
          returnKeyType="next"
        />
      </InputContainer>
    </ExpansiveView>
  );
};

const InputContainer = styled.View`
  height: 58px;
  border: 1px solid ${({ theme }) => theme.COLORS.GREY_20};
  border-radius: 12px;
  padding: 0 16px;
  justify-content: center;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
`;

const StyledInput = styled(TextInput).attrs(({ theme }) => ({
  placeholderTextColor: theme.COLORS.GREY_60,
}))`
  color: ${({ theme }) => theme.COLORS.GREY_80};
`;


