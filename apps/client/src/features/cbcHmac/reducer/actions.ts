import { createAction, props } from '@ngrx/store';
import { CbcHmacNullableT } from '../etc/types';

export interface TmrCbcHmacArgT {
  val: boolean;
}

export const CbcHmacActT = {
  SET_CBC_HMAC: createAction('SET_CBC_HMAC', props<CbcHmacNullableT>()),
  SET_DELETING: createAction('SET_DELETING', props<TmrCbcHmacArgT>()),
  SET_SAVING: createAction('SET_SAVING', props<TmrCbcHmacArgT>()),
  RESET_CBC_HMAC_STATE: createAction('RESET_CBC_HMAC_STATE'),
};
