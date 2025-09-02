import AsyncStorage from '@react-native-async-storage/async-storage';
import type { IAddress } from 'src/types/address';

export type Address = IAddress;

export async function getUserAddress() {
  const addressStorageValue = await AsyncStorage.getItem('@address');

  const userAddress =
    addressStorageValue != null ? (JSON.parse(addressStorageValue) as Address) : undefined;

  return userAddress;
}

export async function setUserAddress(address: Address) {
  await AsyncStorage.setItem('@address', JSON.stringify(address));
}

const HISTORY_STORAGE_KEY = '@address_history';
const MAX_HISTORY_ITEMS = 8;

export async function getAddressHistory(): Promise<Address[]> {
  const historyValue = await AsyncStorage.getItem(HISTORY_STORAGE_KEY);
  if (!historyValue) return [];
  try {
    const parsed = JSON.parse(historyValue) as Address[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function addAddressToHistory(address: Address): Promise<void> {
  const history = await getAddressHistory();
  const normalize = (a: Address) =>
    `${(a.street || '').trim().toLowerCase()}|${Number(a.number || 0)}|${(a.city || '')
      .trim()
      .toLowerCase()}|${(a.state || '').trim().toLowerCase()}`;

  const incomingKey = normalize(address);

  // Remove qualquer ocorrência existente do mesmo endereço (normalizado)
  const withoutDuplication = history.filter((item) => normalize(item) !== incomingKey);

  // Move o endereço atual para o topo e limita o tamanho do histórico
  const updated = [
    {
      ...address,
      number: Number(address.number || 0) || 0,
    },
    ...withoutDuplication,
  ].slice(0, MAX_HISTORY_ITEMS);
  await AsyncStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updated));
}
