export interface ServiceEntity {
  id: string;
  name: string;
  price: number;
  duration: number;
  description: string;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export type ServicePayload = Omit<ServiceEntity, 'id' | 'created_at' | 'updated_at'>;
