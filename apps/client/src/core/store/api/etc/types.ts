/* eslint-disable no-magic-numbers */
import { GenericObjT } from '@/common/types/etc';
import { HttpErrorResponse } from '@angular/common/http';

export interface ConfApiT {
  url: string | null;
  method: HttpMethod;
  requestType: string | null;
  responseType: string | null;
  accessToken: string | null;
  params: GenericObjT;
  body: GenericObjT;
}

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type ResApiT<T> = {
  msg?: string;
  status: number;
} & T;

export interface ErrApiT<T> extends HttpErrorResponse {
  error: ResApiT<T>;
}

export interface OptToastApiT {
  toastOk: boolean;
  toastErr: boolean;
}

export interface OptErrApi {
  pushOnErr: boolean;
  pushOnStatus: number[];
}

export enum StatusT {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  CONFLICT = 409,
  ENTITY_UNPROCESSABLE = 422,
  TOO_MANY_REQUESTS = 429,
  INTERNAL_SERVER_ERROR = 500,
}
