import { HttpResponse } from "./protocols";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const okResponse = <T>(body: any): HttpResponse<T> => {
  return {
    statusCode: 200,
    body,
  };
};

export const createdResponse = <T>(body: any): HttpResponse<T> => {
  return {
    statusCode: 201,
    body,
  };
};

export const badResponse = (message: string): HttpResponse<string> => {
  return {
    statusCode: 400,
    body: message,
  };
};

export const NotFaudResponse = (message: string): HttpResponse<string> => {
  return {
    statusCode: 500,
    body: message,
  };
};
