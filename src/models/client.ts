export interface Client {
  id: string;
  name: string;
  phone: string;
  email: string;
  vehicle_plate: string;
  vehicle_model: string;
  created_at?: string;
  updated_at?: string;
}

export type ClientPayload = Omit<Client, 'id' | 'created_at' | 'updated_at'>;
