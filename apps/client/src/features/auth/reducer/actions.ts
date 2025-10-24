import { createAction, props } from '@ngrx/store';

export type LoggingKeyT = 'loggingIn' | 'loggingOut';
export interface LoggingKeyArgT {
  key: LoggingKeyT;
  val: boolean;
}

export const AuthActT = {
  LOGIN: createAction('LOGIN'),
  LOGOUT: createAction('LOGOUT'),
  SET_LOGGING_TMR: createAction('SET_LOGGING_TMR', props<LoggingKeyArgT>()),
};
