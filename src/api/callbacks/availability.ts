import { api } from '@config/api';

export interface Availability {
  id: string;
  type: 'WEEKLY' | 'SPECIFIC';
  dayOfWeek: number | null; // 0-6 (Domingo-Sábado)
  specificDate: string | null; // ISO date string
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  isActive: boolean;
}

export async function getProfessionalAvailability(professionalId: string): Promise<Availability[]> {
  try {
    const { data } = await api.get<Availability[]>(`/professionals/${professionalId}/availability`);
    return data;
  } catch (err) {
    console.error('Erro ao buscar disponibilidades:', err);
    return [];
  }
}

