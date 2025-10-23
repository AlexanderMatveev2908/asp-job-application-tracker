import { CbcHmacNullableT } from '@/common/types/tokens';
import { createAction, props } from '@ngrx/store';

export type LoggingKeyT = 'loggingIn' | 'loggingOut';
export interface LoggingKeyArgT {
  key: LoggingKeyT;
  val: boolean;
}

export const AuthActT = {
  LOGIN: createAction('LOGIN'),
  LOGOUT: createAction('LOGOUT'),
  SET_LOGGING_KEY: createAction('SET_LOGGING_KEY', props<LoggingKeyArgT>()),
  SET_CBC_HMAC: createAction('SET_CBC_HMAC', props<CbcHmacNullableT>()),
};
