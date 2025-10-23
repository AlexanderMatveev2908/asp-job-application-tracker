import { createReducer, on } from '@ngrx/store';
import { AuthActT, LoggingKeyArgT } from './actions';

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
  on(AuthActT.LOGIN, (state: AuthStateT) => ({
    ...state,
    isLogged: true,
    loggingOut: false,
  })),
  on(AuthActT.LOGOUT, (state: AuthStateT) => ({
    ...state,
    isLogged: false,
    loggingIn: false,
  })),
  on(AuthActT.SET_LOGGING_KEY, (state: AuthStateT, action: LoggingKeyArgT) => ({
    ...state,
    [action.key]: action.val,
  }))
);
