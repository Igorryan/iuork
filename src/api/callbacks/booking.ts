import { api } from '@config/api';

export interface Booking {
  id: string;
  status: 'REQUESTED' | 'ACCEPTED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED' | 'DISPUTED';
  createdAt: string;
  scheduledAt: string | null;
  address?: string | null;
  latitude?: string | null;
  longitude?: string | null;
  service: {
    id: string;
    title: string;
    description?: string | null;
    price?: string;
    pricingType?: 'FIXED' | 'HOURLY' | 'BUDGET';
  };
  client?: {
    id: string;
    name: string;
    phone?: string | null;
    email?: string | null;
    avatarUrl?: string | null;
  };
  professional?: {
    id: string;
    name: string;
    avatarUrl?: string | null;
  };
}

export interface CreateBookingParams {
  professionalId: string;
  serviceId: string;
  scheduledAt: Date | string; // ISO string ou Date
  latitude?: number;
  longitude?: number;
  address?: string;
}

export async function createBooking(params: CreateBookingParams): Promise<Booking> {
  try {
    const scheduledAtStr = params.scheduledAt instanceof Date 
      ? params.scheduledAt.toISOString() 
      : params.scheduledAt;

    const { data } = await api.post<Booking>('/bookings', {
      professionalId: params.professionalId,
      serviceId: params.serviceId,
      scheduledAt: scheduledAtStr,
      latitude: params.latitude,
      longitude: params.longitude,
      address: params.address,
    });

    return data;
  } catch (err: any) {
    console.error('Erro ao criar agendamento:', err);
    throw new Error(err?.response?.data?.message || 'Não foi possível criar o agendamento');
  }
}

export async function getMyBookings(): Promise<Booking[]> {
  try {
    const { data } = await api.get<Booking[]>('/bookings/mine');
    return data;
  } catch (err) {
    console.error('Erro ao buscar agendamentos:', err);
    return [];
  }
}

