import { createReducer, on } from '@ngrx/store';
import { UserT } from '../etc/types';
import { Nullable } from '@/common/types/etc';
import { PendingArgT, UserActT } from './actions';

export interface UserStateT {
  user: Nullable<UserT>;
  // ? track when client make his first call to server
  // ? so u can wait before pushing user out from a page
  // ? knowing he is or not logged
  handShake: boolean;
  isPending: boolean;
}

export const initState: UserStateT = {
  user: null,
  handShake: false,
  isPending: false,
};

export const userReducer = createReducer(
  initState,
  on(UserActT.SET_USER, (state: UserStateT, action: UserT) => ({
    ...state,
    user: action,
    handShake: true,
  })),
  on(UserActT.MARK_NULL, (state: UserStateT) => ({ ...state, user: null, handShake: true })),
  on(UserActT.SET_PENDING, (state: UserStateT, action: PendingArgT) => ({
    ...state,
    isPending: action.isPending,
  }))
);
