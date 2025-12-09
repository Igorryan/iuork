import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { TextInput, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import { ExpansiveView } from '@components/ExpansiveView';
import { getProfessionCategories, type Profession } from '@api/callbacks/profession-categories';
import { Ionicons } from '@expo/vector-icons';
import theme from '@theme/index';

type WhatProps = {
  isActive: boolean;
  onPress(): void;
  value: string;
  setValue(text: string): void;
  renderSuggestionsOutside?: boolean;
  onRenderSuggestions?: (suggestions: React.ReactNode) => void;
  onLayout?: (event: { nativeEvent: { layout: { y: number; height: number } } }) => void;
  onSuggestionSelected?: () => void;
};

export const What: React.FC<WhatProps> = ({ isActive, onPress, value, setValue, renderSuggestionsOutside, onRenderSuggestions, onLayout, onSuggestionSelected }) => {
  const minimizedValue = useMemo(() => (value ? value : 'O que você precisa?'), [value]);
  const [suggestions, setSuggestions] = useState<Profession[]>([]);
  const [allProfessions, setAllProfessions] = useState<Profession[]>([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [isSuggestionSelected, setIsSuggestionSelected] = useState(false);

  // Carregar todas as profissões quando o componente é montado
  useEffect(() => {
    let isMounted = true;
    (async () => {
      setIsLoadingSuggestions(true);
      try {
        const categories = await getProfessionCategories();
        const professions = categories.flatMap(cat => cat.professions || []);
        if (isMounted) {
          setAllProfessions(professions);
        }
      } catch (error) {
        console.error('Erro ao carregar profissões:', error);
      } finally {
        if (isMounted) setIsLoadingSuggestions(false);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  // Resetar isSuggestionSelected quando o usuário começar a digitar novamente
  useEffect(() => {
    if (isSuggestionSelected && value) {
      // Verificar se o valor mudou (usuário está editando)
      const exactMatch = allProfessions.find(profession => 
        profession.name.toLowerCase().trim() === value.toLowerCase().trim()
      );
      // Se não houver correspondência exata, resetar o flag
      if (!exactMatch) {
        setIsSuggestionSelected(false);
      }
    }
  }, [value, allProfessions, isSuggestionSelected]);

  // Filtrar sugestões baseado no texto digitado
  useEffect(() => {
    // Se uma sugestão foi selecionada, não mostrar mais sugestões
    if (isSuggestionSelected) {
      setSuggestions([]);
      if (onRenderSuggestions) {
        onRenderSuggestions(null);
      }
      return;
    }

    if (!value || value.trim().length < 2) {
      setSuggestions([]);
      if (onRenderSuggestions) {
        onRenderSuggestions(null);
      }
      return;
    }

    // Se o valor corresponde exatamente a uma profissão, não mostrar sugestões
    const exactMatch = allProfessions.find(profession => 
      profession.name.toLowerCase().trim() === value.toLowerCase().trim()
    );
    
    if (exactMatch) {
      setSuggestions([]);
      if (onRenderSuggestions) {
        onRenderSuggestions(null);
      }
      return;
    }

    const searchTerm = value.toLowerCase().trim();
    const filtered = allProfessions.filter(profession =>
      profession.name.toLowerCase().includes(searchTerm)
    ).slice(0, 10); // Limitar a 10 sugestões

    setSuggestions(filtered);
  }, [value, allProfessions, onRenderSuggestions, isSuggestionSelected]);

  // Renderizar sugestões fora quando necessário
  useEffect(() => {
    if (renderSuggestionsOutside && onRenderSuggestions) {
      if (suggestions.length > 0 && !isSuggestionSelected) {
        onRenderSuggestions(
          <WhatSuggestions suggestions={suggestions} onSelect={handleSelectSuggestion} />
        );
      } else {
        onRenderSuggestions(null);
      }
    }
  }, [suggestions, renderSuggestionsOutside, onRenderSuggestions, handleSelectSuggestion, isSuggestionSelected]);

  const handleSelectSuggestion = useCallback((professionName: string) => {
    setIsSuggestionSelected(true);
    setValue(professionName);
    setSuggestions([]);
    // Limpar sugestões imediatamente antes de chamar callbacks
    if (onRenderSuggestions) {
      onRenderSuggestions(null);
    }
    // Pequeno delay para garantir que o estado seja atualizado antes de colapsar
    setTimeout(() => {
      if (onSuggestionSelected) {
        onSuggestionSelected();
      }
    }, 0);
  }, [setValue, onRenderSuggestions, onSuggestionSelected]);

  const handleChangeText = useCallback((text: string) => {
    setValue(text);
  }, [setValue]);

  return (
    <ExpansiveView
      isActive={isActive}
      onPress={onPress}
      minimized={{ title: 'Profissional/Serviço', value: minimizedValue }}
      maximized={{ title: 'O que você precisa?' }}
      onLayout={onLayout}
    >
      <InputWrapper>
        <InputContainer>
          <StyledInput
            placeholder="Buscar por profissional ou serviço"
            value={value}
            onChangeText={handleChangeText}
            returnKeyType="next"
            autoFocus={isActive}
          />
          {isLoadingSuggestions && (
            <LoadingIndicator>
              <ActivityIndicator size="small" color={theme.COLORS.GREY_60} />
            </LoadingIndicator>
          )}
        </InputContainer>

        {!renderSuggestionsOutside && suggestions.length > 0 && (
          <SuggestionsContainer pointerEvents="box-none">
            <SuggestionsListWrapper pointerEvents="auto">
              <SuggestionsList
                data={suggestions}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <SuggestionItem 
                    onPress={() => handleSelectSuggestion(item.name)}
                    activeOpacity={0.7}
                  >
                    <Ionicons name="briefcase-outline" size={18} color={theme.COLORS.GREY_60} />
                    <SuggestionText>{item.name}</SuggestionText>
                  </SuggestionItem>
                )}
                keyboardShouldPersistTaps="handled"
                nestedScrollEnabled
              />
            </SuggestionsListWrapper>
          </SuggestionsContainer>
        )}
      </InputWrapper>
    </ExpansiveView>
  );
};

// Componente separado para renderizar sugestões fora do ExpansiveView
export const WhatSuggestions: React.FC<{ suggestions: Profession[]; onSelect: (name: string) => void }> = ({ suggestions, onSelect }) => {
  if (suggestions.length === 0) return null;

  return (
    <ExternalSuggestionsContainer pointerEvents="box-none">
      <SuggestionsListWrapper pointerEvents="auto">
        <SuggestionsList
          data={suggestions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <SuggestionItem 
              onPress={() => onSelect(item.name)}
              activeOpacity={0.7}
            >
              <Ionicons name="briefcase-outline" size={18} color={theme.COLORS.GREY_60} />
              <SuggestionText>{item.name}</SuggestionText>
            </SuggestionItem>
          )}
          keyboardShouldPersistTaps="handled"
          nestedScrollEnabled
        />
      </SuggestionsListWrapper>
    </ExternalSuggestionsContainer>
  );
};

const ExternalSuggestionsContainer = styled.View`
  width: 100%;
`;

const InputWrapper = styled.View`
  position: relative;
  z-index: 10;
`;

const InputContainer = styled.View`
  height: 58px;
  border: 1px solid ${({ theme }) => theme.COLORS.GREY_20};
  border-radius: 12px;
  padding: 0 16px;
  justify-content: center;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  flex-direction: row;
  align-items: center;
`;

const StyledInput = styled(TextInput).attrs(({ theme }) => ({
  placeholderTextColor: theme.COLORS.GREY_60,
}))`
  flex: 1;
  color: ${({ theme }) => theme.COLORS.GREY_80};
`;

const LoadingIndicator = styled.View`
  margin-left: 8px;
`;

const SuggestionsContainer = styled.View`
  position: absolute;
  top: 62px;
  left: -20px;
  right: -20px;
  z-index: 99999;
  elevation: 20;
`;

const SuggestionsListWrapper = styled.View`
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.COLORS.GREY_20};
  max-height: 300px;
  shadow-color: ${({ theme }) => theme.COLORS.SHADOW};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.1;
  shadow-radius: 8px;
  elevation: 10;
`;

const SuggestionsList = styled(FlatList).attrs<{ data: Profession[] }>(() => ({}))`
  max-height: 300px;
` as any;

const SuggestionItem = styled(TouchableOpacity).attrs({
  delayPressIn: 0,
  delayPressOut: 0,
})`
  flex-direction: row;
  align-items: center;
  padding: 14px 16px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.COLORS.GREY_10};
`;

const SuggestionText = styled.Text`
  margin-left: 12px;
  color: ${({ theme }) => theme.COLORS.GREY_80};
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  flex: 1;
`;


