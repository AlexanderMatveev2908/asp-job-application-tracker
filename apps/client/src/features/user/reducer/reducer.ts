import { createReducer } from '@ngrx/store';

export interface UserStateT {
  user: unknown;
}

export const initState: UserStateT = {
  user: null,
};

export const userReducer = createReducer(initState);
