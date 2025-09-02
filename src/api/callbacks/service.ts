import { api } from '@config/api';
import { Service as IService } from '@types/domain';

export const getServiceFromId = async ({ serviceId }: { serviceId: string }) => {
  try {
    const { data } = await api.get<IService>(`/services/${serviceId}`);
    return data;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

export const getServicesByProfessional = async ({
  professionalId,
}: {
  professionalId: string;
}) => {
  try {
    const { data } = await api.get<IService[]>(`/professionals/${professionalId}/services`);
    return data;
  } catch (err) {
    console.log(err);
    return [];
  }
};
