import { api } from '@config/api';
import { Professional as IProfessional } from '../../types/domain';

export async function getAllProfessionals(
  keyword?: string,
  clientAddress?: { latitude: number; longitude: number },
  date?: string | null // Data no formato ISO (YYYY-MM-DD) ou null
): Promise<IProfessional[]> {
  try {
    const params: any = {};
    
    if (keyword && keyword.trim().length > 0) {
      params.keyword = keyword.trim();
    }
    
    if (clientAddress?.latitude && clientAddress?.longitude) {
      params.clientLat = clientAddress.latitude;
      params.clientLng = clientAddress.longitude;
    }
    
    if (date && date.trim().length > 0) {
      params.date = date.trim();
    }
    
    const { data } = await api.get<IProfessional[]>('/professionals', {
      params,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
    return data;
  } catch (err) {
    return [];
  }
}

export async function getProfessional({
  professionalId,
}: {
  professionalId: string;
}): Promise<IProfessional | null> {
  try {
    const { data } = await api.get<IProfessional>(`/professionals/${professionalId}`);
    return data;
  } catch (err) {
    return null;
  }
}
