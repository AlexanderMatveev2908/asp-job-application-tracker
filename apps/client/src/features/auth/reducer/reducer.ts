import { createReducer } from '@ngrx/store';

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

export const authReducer = createReducer(initState);
