import { GenericObjT } from '@/common/types/etc';

export interface ConfApiT {
  url: string | null;
  method: string;
  responseType: string | null;
  accessToken: string | null;
  params: GenericObjT;
  body: GenericObjT;
}

export type ResApiT<T> = {
  conf: ConfApiT;
  msg: string;
  status: number;
} & T;
