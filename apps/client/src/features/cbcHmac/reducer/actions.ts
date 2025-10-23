import { createAction, props } from '@ngrx/store';
import { CbcHmacNullableT } from '../etc/types';

export const CbcHmacActT = {
  SET_CBC_HMAC: createAction('SET_CBC_HMAC', props<CbcHmacNullableT>()),
};
