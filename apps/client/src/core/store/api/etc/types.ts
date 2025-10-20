/* eslint-disable no-magic-numbers */
import { GenericObjT, Nullable } from '@/common/types/etc';
import { HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ConfApiT {
  url: Nullable<string>;
  method: HttpMethod;
  requestType: Nullable<string>;
  responseType: Nullable<string>;
  accessToken: Nullable<string>;
  params: GenericObjT;
  body: GenericObjT;
}

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type ResApiT<T> = {
  msg?: string;
  status: number;
} & T &
  HttpEvent<unknown>;

export type ObsResT<T> = Observable<ResApiT<T>>;
export type ObsOnOkT<T> = Observable<ResApiT<T> | never>;

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
