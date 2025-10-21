import { UserT } from '@/features/user/etc/types';
import { LibTests } from '..';

export interface FillInputT {
  field: string;
  val: string;
}

// ? test/user endpoint
export interface TkResT {
  user: UserT;
  accessToken: string;
  refreshToken: string;
  cbcHmacToken: string;
  plainPwd: string;
}

export interface PreTestResT {
  lib: LibTests;
  res: TkResT;
}
