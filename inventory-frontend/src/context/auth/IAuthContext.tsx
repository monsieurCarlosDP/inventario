import type { AuthResponse } from "../../services/auth-service/IAuthService";

export interface IAuthContext {
  user: AuthResponse["user"] | undefined;
  isLogging: boolean;
  login: (identifier: string, password: string) => Promise<void>;
  logout: () => void;
}
