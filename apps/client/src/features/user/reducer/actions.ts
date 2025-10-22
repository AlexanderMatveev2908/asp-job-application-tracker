import { createAction, props } from '@ngrx/store';
import { UserT } from '../etc/types';

export const UserActT = {
  SET_USER: createAction('SET_USER', props<UserT>()),
  RESET: createAction('RESET'),
};
