import { api } from '@config/api';
import { Review as IReview } from '../../types/domain';

export const getReviewsFromService = async ({ serviceId }: { serviceId: string }) => {
  try {
    const { data } = await api.get<IReview[]>(`/reviews`, { params: { serviceId } });
    return data.filter((r) => r.serviceId === serviceId);
  } catch (err) {
    return [];
  }
};

export const getReviewsByProfessional = async ({
  professionalId,
}: {
  professionalId: string;
}) => {
  try {
    const { data } = await api.get<IReview[]>(`/professionals/${professionalId}/reviews`);
    return data;
  } catch (err) {
    return [];
  }
};
