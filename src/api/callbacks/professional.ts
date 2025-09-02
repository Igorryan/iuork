import { api } from '@config/api';
import { Professional as IProfessional } from '@types/domain';

export async function getAllProfessionals(): Promise<IProfessional[]> {
  try {
    const { data } = await api.get<IProfessional[]>('/professionals');
    return data;
  } catch (err) {
    console.log(err);
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
    console.log(err);
    return null;
  }
}
