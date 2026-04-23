export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  token?: string;
  user?: UserSummary;
}

export interface UserSummary {
  id: string;
  email: string;
}
