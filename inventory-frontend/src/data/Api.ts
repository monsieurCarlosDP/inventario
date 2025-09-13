import type { RequestConfig } from "./IApi";

export class Api {
  private baseUrl: string;
  private defaultHeaders: Record<string, string>;

  private http: (url: string, config: RequestConfig) => Promise<Response>;

  constructor(baseUrl: string = import.meta.env.VITE_BASE_API_URL) {
    this.baseUrl = baseUrl;
    this.defaultHeaders = {
      "Content-Type": "application/json",
    };
    this.http = async (
      url: string,
      config: RequestConfig
    ): Promise<Response> => {
      console.log(`${this.baseUrl}/${url}`);
      const fullUrl = new URL(`${this.baseUrl}/${url}`);

      const requestConfig: RequestInit = {
        method: config.method,
        headers: {
          ...this.defaultHeaders,
          ...config.headers,
        },
        body: config.body,
      };
      const response = await fetch(fullUrl, requestConfig);

      return response;
    };
  }

  setAuthToken(token: string): void {
    this.defaultHeaders["Authorization"] = `Bearer ${token}`;
  }

  removeAuthToken(): void {
    delete this.defaultHeaders["Authorization"];
  }

  async post(
    path: string,
    body?: unknown,
    headers?: Record<string, string>
  ): Promise<Response> {
    return this.http(path, {
      method: "POST",
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  }

  async authLoginLocal(
    identifier: string,
    password: string
  ): Promise<Response> {
    return this.post("api/auth/local", { identifier, password });
  }
}
