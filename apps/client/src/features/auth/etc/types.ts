import { CbcHmacMandatoryT } from '@/features/cbcHmac/etc/types';

export interface JwtResT {
  accessToken: string;
}

export interface JwtOrCbcHmacResT {
  accessToken?: string;
  cbcHmacToken?: string;
}

export interface RecoverPwdArgT extends CbcHmacMandatoryT {
  password: string;
}

export interface Form2faT {
  totpCode?: string;
  backupCode?: string;
  cbcHmacToken: string;
}
