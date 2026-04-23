export interface Professional {
  id: string;
  name: string;
  phone: string;
  available_days: string[];
  created_at?: string;
  updated_at?: string;
}

export type ProfessionalPayload = Omit<Professional, 'id' | 'created_at' | 'updated_at'>;
