import { GenericObjT } from '@/common/types/etc';

export interface ConfApiT {
  fullURL: string | null;
  method: string;
  accessToken: string | null;
  params: GenericObjT;
  body: GenericObjT;
}

export type ResApiT<T> = {
  conf: ConfApiT;
  msg: string;
  status: number;
} & T;
