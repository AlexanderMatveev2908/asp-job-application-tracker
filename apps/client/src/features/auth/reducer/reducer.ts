import { createReducer, on } from '@ngrx/store';
import { AuthActT, ResetLoggingT } from './actions';

export interface AuthStateT {
  isLogged: boolean;
  loggingIn: boolean;
  loggingOut: boolean;
}

export const initState: AuthStateT = {
  isLogged: false,
  loggingIn: false,
  loggingOut: false,
};

export const authReducer = createReducer(
  initState,
  on(AuthActT.LOGIN, (state: AuthStateT) => ({ ...state, loggingIn: true, isLogged: true })),
  on(AuthActT.RESET_LOGGING_STATE, (state: AuthStateT, action: ResetLoggingT) => ({
    ...state,
    [action.key]: false,
  })),
  on(AuthActT.MARK_LOGGED, (state: AuthStateT) => ({ ...state, isLogged: true })),
  on(AuthActT.LOGOUT, (state: AuthStateT) => ({ ...state, isLogged: false, loggingOut: true }))
);
