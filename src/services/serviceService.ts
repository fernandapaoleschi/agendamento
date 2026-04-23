import { api } from './api';
import type { ServiceEntity, ServicePayload } from '../models/service';

const base = '/services';

export const serviceService = {
  async findAll() {
    const { data } = await api.get<ServiceEntity[]>(base);
    return data;
  },
  async create(payload: ServicePayload) {
    const { data } = await api.post<ServiceEntity>(base, payload);
    return data;
  },
  async update(id: string, payload: Partial<ServicePayload>) {
    const { data } = await api.patch<ServiceEntity>(`${base}/${id}`, payload);
    return data;
  },
  async remove(id: string) {
    await api.delete(`${base}/${id}`);
  },
};
