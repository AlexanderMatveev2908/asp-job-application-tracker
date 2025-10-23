import { UserT } from '@/features/user/etc/types';
import { LibTests } from '..';
import { Locator } from '@playwright/test';

export interface DataFieldT {
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

interface BaseResT {
  lib: LibTests;
  res: TkResT;
}

export type PreTestResT<T> = T extends void ? BaseResT : BaseResT & T;

export type PreTestFormResT = PreTestResT<{ form: Locator }>;
