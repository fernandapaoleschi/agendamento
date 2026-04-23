import { api } from './api';
import type { User, UserPayload } from '../models/user';

const base = '/users';

export const userService = {
  async findAll() {
    const { data } = await api.get<User[]>(base);
    return data;
  },
  async create(payload: UserPayload) {
    const { data } = await api.post<User>(base, payload);
    return data;
  },
  async update(id: string, payload: Partial<UserPayload>) {
    const { data } = await api.patch<User>(`${base}/${id}`, payload);
    return data;
  },
  async remove(id: string) {
    await api.delete(`${base}/${id}`);
  },
};
