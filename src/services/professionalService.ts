import { api } from './api';
import type { Professional, ProfessionalPayload } from '../models/professional';

const base = '/professionals';

export const professionalService = {
  async findAll() {
    const { data } = await api.get<Professional[]>(base);
    return data;
  },
  async create(payload: ProfessionalPayload) {
    const { data } = await api.post<Professional>(base, payload);
    return data;
  },
  async update(id: string, payload: Partial<ProfessionalPayload>) {
    const { data } = await api.patch<Professional>(`${base}/${id}`, payload);
    return data;
  },
  async remove(id: string) {
    await api.delete(`${base}/${id}`);
  },
};
