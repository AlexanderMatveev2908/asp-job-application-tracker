import { createReducer, on } from '@ngrx/store';
import { UserT } from '../etc/types';
import { Nullable } from '@/common/types/etc';
import { UserActT } from './actions';

export interface UserStateT {
  user: Nullable<UserT>;
}

export const initState: UserStateT = {
  user: null,
};

export const userReducer = createReducer(
  initState,
  on(UserActT.SET_USER, (state: UserStateT, action: UserT) => ({ ...state, user: action })),
  on(UserActT.RESET, (_: UserStateT) => initState)
);
