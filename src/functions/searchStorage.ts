import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Address } from './getUserAddress';

export type SearchQuery = {
  address: Address;
  keyword: string;
  date?: string | null; // Data no formato ISO (YYYY-MM-DD) ou null
};

const SEARCH_KEY = '@client_last_search';

export async function setLastSearch(query: SearchQuery): Promise<void> {
  await AsyncStorage.setItem(SEARCH_KEY, JSON.stringify(query));
}

export async function getLastSearch(): Promise<SearchQuery | undefined> {
  const value = await AsyncStorage.getItem(SEARCH_KEY);
  if (!value) return undefined;
  try {
    return JSON.parse(value) as SearchQuery;
  } catch {
    return undefined;
  }
}

export async function clearLastSearch(): Promise<void> {
  await AsyncStorage.removeItem(SEARCH_KEY);
}


