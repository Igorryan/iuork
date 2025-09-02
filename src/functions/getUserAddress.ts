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
  const withoutDuplication = history.filter(
    (item) =>
      !(
        item.latitude === address.latitude &&
        item.longitude === address.longitude &&
        item.street === address.street &&
        item.number === address.number &&
        item.city === address.city
      ),
  );
  const updated = [address, ...withoutDuplication].slice(0, MAX_HISTORY_ITEMS);
  await AsyncStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updated));
}
