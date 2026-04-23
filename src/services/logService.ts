import { api } from './api';
import type { LogEntry } from '../models/log';

export const logService = {
  async findAll() {
    const { data } = await api.get<LogEntry[]>('/logs');
    return data;
  },
};
