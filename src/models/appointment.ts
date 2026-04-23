import type { Client } from './client';
import type { Professional } from './professional';
import type { ServiceEntity } from './service';

export type AppointmentStatus = 'scheduled' | 'completed' | 'cancelled' | 'no_show';

export interface Appointment {
  id: string;
  status: AppointmentStatus;
  date: string;
  time: string;
  value: number;
  vehicle_plate: string;
  notes?: string;
  client_id: string;
  service_id: string;
  professional_id?: string;
  client?: Client;
  service?: ServiceEntity;
  professional?: Professional;
  created_at?: string;
  updated_at?: string;
}

export interface AppointmentPayload {
  status: AppointmentStatus;
  date: string;
  time: string;
  value: number;
  vehicle_plate: string;
  notes?: string;
  client_id: string;
  service_id: string;
  professional_id?: string;
}

export interface UpdateAppointmentStatusPayload {
  status: AppointmentStatus;
}
