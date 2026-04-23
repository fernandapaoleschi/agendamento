import { api } from './api';
import type { Client, ClientPayload } from '../models/client';

const base = '/clients';

export const clientService = {
  async findAll() {
    const { data } = await api.get<Client[]>(base);
    return data;
  },
  async create(payload: ClientPayload) {
    const { data } = await api.post<Client>(base, payload);
    return data;
  },
  async update(id: string, payload: Partial<ClientPayload>) {
    const { data } = await api.patch<Client>(`${base}/${id}`, payload);
    return data;
  },
  async remove(id: string) {
    await api.delete(`${base}/${id}`);
  },
};
