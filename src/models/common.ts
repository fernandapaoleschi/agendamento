export interface ApiListResponse<T> {
  data: T[];
  total?: number;
  page?: number;
  limit?: number;
}

export interface ApiError {
  message: string;
  error?: string;
  statusCode?: number;
}
