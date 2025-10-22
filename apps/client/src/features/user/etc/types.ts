import { Nullable, SqlTableT } from '@/common/types/etc';

export interface UserT extends SqlTableT {
  firstName: string;
  lastName: string;
  email: string;
  tmpEmail: Nullable<string>;
  verified: boolean;

  toptSecret?: string;
  password?: string;
}

export interface ResInfoT {
  user?: UserT;
}
