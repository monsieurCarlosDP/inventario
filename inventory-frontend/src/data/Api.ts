import type { Paginated, RequestConfig } from "./IApi";
import type { IItemList } from "./Models";

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
      const fullUrl = new URL(`${this.baseUrl}/${url}`);

      // Handle FormData - don't set Content-Type header for FormData
      const isFormData = config.body instanceof FormData;
      let headers = { ...this.defaultHeaders };

      // Merge additional headers
      if (config.headers) {
        headers = { ...headers, ...config.headers };
      }

      // Remove Content-Type for FormData to let browser set it with boundary
      if (isFormData) {
        delete headers["Content-Type"];
      } else if (!isFormData && config.body !== undefined) {
        // Ensure Content-Type is set for JSON
        headers["Content-Type"] = "application/json";
      }

      const requestConfig: RequestInit = {
        method: config.method,
        headers,
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
    // Handle FormData differently - don't stringify it and don't set Content-Type
    const isFormData = body instanceof FormData;

    return this.http(path, {
      method: "POST",
      headers: headers || {},
      body: isFormData
        ? body
        : body !== undefined
        ? JSON.stringify(body)
        : undefined,
    });
  }

  async get<T>(path: string, headers?: Record<string, string>): Promise<T> {
    const response = await this.http(path, {
      method: "GET",
      headers,
    });
    return response.json();
  }

  async delete(
    path: string,
    headers?: Record<string, string>
  ): Promise<Response> {
    return this.http(path, {
      method: "DELETE",
      headers: headers || {},
    });
  }

  async authLoginLocal(
    identifier: string,
    password: string
  ): Promise<Response> {
    return this.post("api/auth/local", { identifier, password });
  }

  async getItemList<T = IItemList>(
    page: number = 1,
    pageSize: number = 25
  ): Promise<Paginated<T>> {
    return this.get<Paginated<T>>(
      `api/items?populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}`
    );
  }
  async getItemTypeList<T = IItemList>(
    page: number = 1,
    pageSize: number = 25
  ): Promise<Paginated<T>> {
    return this.get<Paginated<T>>(
      `api/item-types?populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}`
    );
  }

  async deleteItemById(id: string): Promise<Response> {
    return this.delete(`api/items/${id}`);
  }

  async getUserFavItemsById<T = IItemList>(
    id: string,
    page: number = 1,
    pageSize: number = 25
  ): Promise<Paginated<T>> {
    return this.get<Paginated<T>>(
      `api/items?populate=*&filters[Favorited][id][$eq]=${id}&pagination[page]=${page}&pagination[pageSize]=${pageSize}`
    );
  }
}
