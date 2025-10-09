export interface Address {
  latitude: number;
  longitude: number;
  street?: string;
  number?: number;
  district?: string;
  city?: string;
  state?: string;
  postalcode?: string;
  distanceInMeters?: number | null;
}

export interface ReviewClient {
  id: string;
  name: string;
  image: string;
}

export interface Review {
  id: string;
  serviceId: string;
  professionalId: string;
  rating: number;
  description: string;
  client: ReviewClient;
  createdAt: string;
}

export interface Service {
  id: string;
  name: string;
  professionalId: string;
  category: string;
  description: string;
  pricingType?: 'FIXED' | 'HOURLY' | 'BUDGET';
  price: number | null;
  images: string[];
}

export interface Professional {
  id: string;
  userId: string; // ✅ ID do User (necessário para chat)
  image: string;
  coverImage?: string;
  name: string;
  profession: string;
  description: string;
  address: Address;
  completedServicesCount: number;
  ratingsAggregate: {
    avg: number;
    count: number;
  };
}


