import { createAction, props } from '@ngrx/store';

export type ResetLoggingKeyT = 'loggingIn' | 'loggingOut';
export interface ResetLoggingT {
  key: ResetLoggingKeyT;
}

export const AuthActT = {
  LOGIN: createAction('LOGIN'),
  RESET_LOGGING_STATE: createAction('RESET_LOGGING_STATE', props<ResetLoggingT>()),
  MARK_LOGGED: createAction('MARK_LOGGED'),
  LOGOUT: createAction('LOGOUT'),
};
