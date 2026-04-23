import { api } from './api';
import type { LoginPayload, LoginResponse } from '../models/auth';

export const authService = {
  async login(payload: LoginPayload) {
    const { data } = await api.post<LoginResponse>('/auth/login', payload);
    return data;
  },
};
