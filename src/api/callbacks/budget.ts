import { api } from '@config/api';

export interface Budget {
  id: string;
  chatId: string;
  serviceId: string;
  price: string;
  description: string | null;
  status: 'PENDING' | 'QUOTED' | 'ACCEPTED' | 'REJECTED' | 'EXPIRED';
  createdAt: string;
  updatedAt: string;
  expiresAt: string | null;
  chat?: {
    id: string;
    clientId: string;
    professionalId: string;
    serviceId: string | null;
    client: {
      id: string;
      name: string;
      avatarUrl: string | null;
    };
    professional: {
      id: string;
      name: string;
      avatarUrl: string | null;
    };
    service: {
      id: string;
      title: string;
    } | null;
  };
}

/**
 * Buscar orçamentos de um chat
 */
export async function getChatBudgets(chatId: string, status?: string): Promise<Budget[]> {
  try {
    const params = status ? { status } : {};
    const { data } = await api.get<Budget[]>(`/api/chats/${chatId}/budgets`, { params });
    return data;
  } catch (err) {
    console.error('Error fetching budgets:', err);
    return [];
  }
}

/**
 * Buscar orçamento aceito de um serviço específico para um cliente
 */
export async function getAcceptedBudget(serviceId: string, clientId: string): Promise<Budget | null> {
  try {
    const { data } = await api.get<Budget>(`/api/budgets/service/${serviceId}/client/${clientId}`);
    return data;
  } catch (err: any) {
    // Se retornar 404, significa que não há orçamento aceito
    if (err?.response?.status === 404) {
      return null;
    }
    console.error('Error fetching accepted budget:', err);
    return null;
  }
}

/**
 * Buscar orçamento pendente de um serviço específico para um cliente
 */
export async function getPendingBudget(serviceId: string, clientId: string): Promise<Budget | null> {
  try {
    const { data } = await api.get<Budget>(`/api/budgets/service/${serviceId}/client/${clientId}/pending`);
    return data;
  } catch (err: any) {
    // Se retornar 404, significa que não há orçamento pendente
    if (err?.response?.status === 404) {
      return null;
    }
    console.error('Error fetching pending budget:', err);
    return null;
  }
}

/**
 * Buscar orçamento com preço definido (PENDING mas price > 0)
 */
export async function getBudgetWithPrice(serviceId: string, clientId: string): Promise<Budget | null> {
  try {
    const { data } = await api.get<Budget>(`/api/budgets/service/${serviceId}/client/${clientId}/with-price`);
    return data;
  } catch (err: any) {
    // Se retornar 404, significa que não há orçamento com preço
    if (err?.response?.status === 404) {
      return null;
    }
    console.error('Error fetching budget with price:', err);
    return null;
  }
}

/**
 * Criar solicitação de orçamento (status PENDING)
 */
export async function createBudgetRequest(
  clientId: string,
  professionalId: string,
  serviceId: string
): Promise<Budget | null> {
  try {
    const { data } = await api.post<Budget>('/api/budgets/request', {
      clientId,
      professionalId,
      serviceId,
    });
    return data;
  } catch (err) {
    console.error('Error creating budget request:', err);
    return null;
  }
}

/**
 * Aceitar orçamento
 */
export async function acceptBudget(budgetId: string): Promise<Budget | null> {
  try {
    const { data } = await api.patch<Budget>(`/api/budgets/${budgetId}/accept`);
    return data;
  } catch (err) {
    console.error('Error accepting budget:', err);
    return null;
  }
}

/**
 * Rejeitar orçamento
 */
export async function rejectBudget(budgetId: string): Promise<Budget | null> {
  try {
    const { data } = await api.patch<Budget>(`/api/budgets/${budgetId}/reject`);
    return data;
  } catch (err) {
    console.error('Error rejecting budget:', err);
    return null;
  }
}

/**
 * Cancelar orçamento (usado ao refazer)
 */
export async function cancelBudget(budgetId: string): Promise<Budget | null> {
  try {
    const { data } = await api.patch<Budget>(`/api/budgets/${budgetId}/cancel`);
    return data;
  } catch (err) {
    console.error('Error canceling budget:', err);
    return null;
  }
}

