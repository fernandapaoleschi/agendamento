import { api } from './api';
import type { Appointment, AppointmentPayload, UpdateAppointmentStatusPayload } from '../models/appointment';

const base = '/appointments';

export const appointmentService = {
  async findAll() {
    const { data } = await api.get<Appointment[]>(base);
    return data;
  },
  async create(payload: AppointmentPayload) {
    const { data } = await api.post<Appointment>(base, payload);
    return data;
  },
  async update(id: string, payload: Partial<AppointmentPayload>) {
    const { data } = await api.patch<Appointment>(`${base}/${id}`, payload);
    return data;
  },
  async updateStatus(id: string, payload: UpdateAppointmentStatusPayload) {
    const { data } = await api.patch<Appointment>(`${base}/${id}/status`, payload);
    return data;
  },
  async remove(id: string) {
    await api.delete(`${base}/${id}`);
  },
};
