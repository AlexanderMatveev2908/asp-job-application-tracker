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
  msg: string;
  status: number;
} & T;

export interface ErrApiT<T> extends HttpErrorResponse {
  error: ResApiT<T>;
}

export interface OptToastApiT {
  toastOk: boolean;
  toastErr: boolean;
}
