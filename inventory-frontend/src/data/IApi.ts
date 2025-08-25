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
