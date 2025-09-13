export interface AuthUser {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  Avatar: string;
}

export interface AuthResponse {
  jwt: string;
  user: AuthUser;
}

export interface AuthErrorResponse {
  data: Record<string, unknown>;
  error: {
    status: number;
    name: string;
    message: string;
    details: Record<string, unknown>;
  };
}

export interface IAuthService {
  login(identifier: string, password: string): Promise<AuthResponse>;
}
