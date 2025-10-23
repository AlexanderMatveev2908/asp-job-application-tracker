import { CbcHmacMandatoryT } from '@/features/cbcHmac/etc/types';

export interface JwtResT {
  accessToken: string;
}

export interface RecoverPwdArgT extends CbcHmacMandatoryT {
  password: string;
}
