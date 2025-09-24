export type HttpMethods = "GET" | "POST" | "PUT" | "DELETE";

export interface RequestConfig {
  method: HttpMethods;
  headers?: Record<string, string>;
  body?: BodyInit;
}

export interface ApiRequestOptions {
  headers?: Record<string, string>;
  body?: BodyInit;
}

export type Paginated<T> = {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
};
