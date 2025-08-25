import type { ApiRequestOptions, RequestConfig } from "./IApi";

export class Api {
  private baseUrl: string;
  private defaultHeaders: Record<string, string>;

  private http: (url: string, config: RequestConfig) => Promise<Response>;

  constructor(baseUrl: string = import.meta.env.BASED_API_URL) {
    this.baseUrl = baseUrl;
    this.defaultHeaders = {
      "Content-Type": "application/json",
    };
    this.http = async (
      url: string,
      config: RequestConfig
    ): Promise<Response> => {
      const fullUrl = new URL(`${baseUrl}/${url}`);

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

  async get<T>(endpoint: string, options?: ApiRequestOptions): Promise<T> {
    const response = await this.http(endpoint, {
      method: "GET",
      headers: options?.headers,
    });
    return response.json();
  }

  async post<T>(
    endpoint: string,
    data?: T,
    options?: ApiRequestOptions
  ): Promise<T> {
    const response = await this.http(endpoint, {
      method: "POST",
      headers: options?.headers,
      body: data ? JSON.stringify(data) : undefined,
    });
    return response.json();
  }

  async put<T>(
    endpoint: string,
    data?: T,
    options?: ApiRequestOptions
  ): Promise<T> {
    const response = await this.http(endpoint, {
      method: "PUT",
      headers: options?.headers,
      body: data ? JSON.stringify(data) : undefined,
    });
    return response.json();
  }

  async delete<T>(endpoint: string, options?: ApiRequestOptions): Promise<T> {
    const response = await this.http(endpoint, {
      method: "DELETE",
      headers: options?.headers,
    });
    return response.json();
  }

  async uploadFile<T>(
    endpoint: string,
    file: File,
    options?: Omit<ApiRequestOptions, "body">
  ): Promise<T> {
    const formData = new FormData();
    formData.append("file", file);

    const response = await this.http(endpoint, {
      method: "POST",
      headers: {
        ...options?.headers,
      },
      body: formData,
    });
    return response.json();
  }

  setAuthToken(token: string): void {
    this.defaultHeaders["Authorization"] = `Bearer ${token}`;
  }

  removeAuthToken(): void {
    delete this.defaultHeaders["Authorization"];
  }
}
