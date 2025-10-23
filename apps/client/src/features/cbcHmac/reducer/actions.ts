import { createAction, props } from '@ngrx/store';
import { CbcHmacNullableT } from '../etc/types';

export interface DeletingCbcHmacArgT {
  deleting: boolean;
}

export const CbcHmacActT = {
  SET_CBC_HMAC: createAction('SET_CBC_HMAC', props<CbcHmacNullableT>()),
  SET_DELETING: createAction('SET_DELETING', props<DeletingCbcHmacArgT>()),
};
