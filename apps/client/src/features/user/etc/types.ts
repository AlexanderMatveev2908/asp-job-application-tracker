import { Nullable, SqlTableT } from '@/common/types/etc';

export interface UserT extends SqlTableT {
  firstName: string;
  lastName: string;
  email: string;
  tmpEmail: Nullable<string>;
  isVerified: boolean;

  toptSecret?: string;
  password?: string;
}

export interface ResProfileT {
  user?: UserT;
}

interface BaseUserFormArgT {
  cbcHmacToken: string;
}
export type UserFormArgT<T> = T extends void ? BaseUserFormArgT : BaseUserFormArgT & T;
