import { GenericObjT } from '@/common/types/etc';

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

export interface ToastOptApiT {
  toastOk: boolean;
  toastErr: boolean;
}
