import { Api } from "../../data/Api";
import type {
  AuthErrorResponse,
  AuthResponse,
  IAuthService,
} from "./IAuthService";

export class AuthService implements IAuthService {
  private api: Api;

  constructor(api: Api = new Api()) {
    this.api = api;
  }

  async login(identifier: string, password: string): Promise<AuthResponse> {
    const response = await this.api.authLoginLocal(identifier, password);

    const json = (await response.json()) as unknown;

    if (!response.ok) {
      const parsedError = json as AuthErrorResponse;
      throw this.createAuthError(parsedError, response.status);
    }

    const data = json as AuthResponse;
    if (data?.jwt) {
      this.api.setAuthToken(data.jwt);
    }
    return data;
  }

  private createAuthError(
    payload: AuthErrorResponse | undefined,
    fallbackStatus: number
  ): Error & {
    status?: number;
    details?: unknown;
  } {
    const message = payload?.error?.message || "Login failed";
    const status = payload?.error?.status ?? fallbackStatus;
    const err = new Error(message) as Error & {
      status?: number;
      details?: unknown;
    };
    err.status = status;
    err.details = payload?.error?.details;
    return err;
  }
}

export default AuthService;
