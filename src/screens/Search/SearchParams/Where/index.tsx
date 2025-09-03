import { InputFindAddress } from '@components/InputFindAddress';
import { ExpansiveView } from '@components/ExpansiveView';
import { View } from 'react-native';
import { IAddress } from 'src/types/address';
import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { addAddressToHistory, getAddressHistory } from '@functions/getUserAddress';

type WhereProps = {
  isActive: boolean;
  onPress(): void;
  address: IAddress | undefined;
  setAddress(address: IAddress): void;
  suggestedAddress?: IAddress | undefined;
  onAddressSelected?(): void;
};

export const Where: React.FC<WhereProps> = ({ isActive, onPress, address, setAddress, suggestedAddress, onAddressSelected }) => {
  const [history, setHistory] = useState<IAddress[]>([]);

  const loadHistory = useCallback(async () => {
    const list = await getAddressHistory();
    setHistory(list);
  }, []);

  useEffect(() => {
    loadHistory();
  }, [loadHistory, isActive]);

  async function handleChangeAddress(a: IAddress) {
    setAddress(a);
    await addAddressToHistory(a);
    loadHistory();
    onAddressSelected && onAddressSelected();
  }

  function handleSelectHistoryItem(item: IAddress) {
    setAddress(item);
    onAddressSelected && onAddressSelected();
  }

  async function handleSelectSuggestedAddress() {
    if (!suggestedAddress) return;
    setAddress(suggestedAddress);
    await addAddressToHistory(suggestedAddress);
    loadHistory();
    onAddressSelected && onAddressSelected();
  }

  function formatStreetLine(a?: IAddress) {
    if (!a) return 'Para onde?';
    const num = Number(a.number || 0);
    const numText = num > 0 ? String(num) : 's/n';
    const street = a.street || '';
    return street ? `${street}, ${numText}` : `${numText}`;
  }

  return (
    <ExpansiveView
      isActive={isActive}
      onPress={onPress}
      minimized={{
        title: 'Endereço',
        value: formatStreetLine(address),
      }}
      maximized={{
        title: 'Para onde?',
      }}
    >
      <View>
        <InputFindAddress changeAddress={handleChangeAddress} clearTextOnFocus />

        {suggestedAddress && (
          <SuggestionContainer>
            <SuggestionTitle>Localização atual</SuggestionTitle>
            <SuggestionItem onPress={handleSelectSuggestedAddress} activeOpacity={0.8}>
              <HistoryItemText>
                {`${suggestedAddress.street}${suggestedAddress.number ? `, ${suggestedAddress.number}` : ''}`}
              </HistoryItemText>
              <HistorySubText>{`${suggestedAddress.city} - ${suggestedAddress.state}`}</HistorySubText>
            </SuggestionItem>
          </SuggestionContainer>
        )}

        {history && history.length > 0 && (
          <HistoryContainer>
            <HistoryTitle>Recentes</HistoryTitle>
            {history.map((item, index) => (
              <HistoryItem key={`${item.latitude}-${item.longitude}-${index}`} onPress={() => handleSelectHistoryItem(item)} activeOpacity={0.8}>
                <HistoryItemText>
                  {`${item.street}${item.number ? `, ${item.number}` : ''}`}
                </HistoryItemText>
                <HistorySubText>{`${item.city} - ${item.state}`}</HistorySubText>
              </HistoryItem>
            ))}
          </HistoryContainer>
        )}
      </View>
    </ExpansiveView>
  );
};

const HistoryContainer = styled.View`
  margin-top: 16px;
`;

const HistoryTitle = styled.Text`
  color: ${({ theme }) => theme.COLORS.GREY_80};
  font-size: 14px;
  margin-bottom: 8px;
`;

const HistoryItem = styled.TouchableOpacity`
  padding: 12px 8px;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  border: 1px solid ${({ theme }) => theme.COLORS.GREY_20};
  border-radius: 8px;
  margin-bottom: 8px;
`;

const HistoryItemText = styled.Text`
  color: ${({ theme }) => theme.COLORS.GREY_60};
  font-size: 16px;
`;

const HistorySubText = styled.Text`
  color: ${({ theme }) => theme.COLORS.GREY_60};
  font-size: 12px;
  margin-top: 2px;
`;

const SuggestionContainer = styled.View`
  margin-top: 16px;
`;

const SuggestionTitle = styled.Text`
  color: ${({ theme }) => theme.COLORS.GREY_80};
  font-size: 14px;
  margin-bottom: 8px;
`;

const SuggestionItem = styled(HistoryItem)``;
