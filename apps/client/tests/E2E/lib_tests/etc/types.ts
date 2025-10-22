import { UserT } from '@/features/user/etc/types';
import { LibTests } from '..';
import { Locator } from '@playwright/test';

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

export type PreTestResT<T> = {
  lib: LibTests;
  res: TkResT;
} & T;

export type PreTestFormResT = PreTestResT<{ form: Locator }>;
