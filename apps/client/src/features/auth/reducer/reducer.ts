import { createReducer } from '@ngrx/store';

export interface AuthStateT {
  isLogged: boolean;
}

export const initState: AuthStateT = {
  isLogged: false,
};

export const authReducer = createReducer(initState);
