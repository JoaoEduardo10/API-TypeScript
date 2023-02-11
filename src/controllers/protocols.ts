/* eslint-disable @typescript-eslint/no-explicit-any */
export interface HttpResponse<T> {
  statusCode: number;
  body: T;
}

export interface HttpRequest<B> {
  params?: any;
  headers?: any;
  body?: B;
}

export interface IControllrs {
  handle(HttpRequest: HttpRequest<unknown>): Promise<HttpResponse<unknown>>;
}
