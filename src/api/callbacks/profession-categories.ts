import { api } from '@config/api';

export interface ProfessionCategory {
  id: string;
  name: string;
  slug: string;
  icon: string | null;
  color: string | null;
  imageUrl: string | null;
  professions: Profession[];
}

export interface Profession {
  id: string;
  name: string;
  imageUrl: string | null;
  categoryId: string | null;
  category?: ProfessionCategory | null;
}

export async function getProfessionCategories(): Promise<ProfessionCategory[]> {
  try {
    const { data } = await api.get<ProfessionCategory[]>('/profession-categories');
    return data;
  } catch (err) {
    return [];
  }
}

export async function getProfessionCategoryBySlug(slug: string): Promise<ProfessionCategory | null> {
  try {
    const { data } = await api.get<ProfessionCategory>(`/profession-categories/${slug}/professions`);
    return data;
  } catch (err) {
    return null;
  }
}

