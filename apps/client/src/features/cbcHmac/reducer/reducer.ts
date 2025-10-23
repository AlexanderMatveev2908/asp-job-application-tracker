import { createReducer, on } from '@ngrx/store';
import { Nullable } from '@/common/types/etc';
import { CbcHmacActT } from './actions';
import { CbcHmacNullableT } from '../etc/types';

export interface CbcHmacStateT {
  cbcHmacToken: Nullable<string>;
}

export const initState: CbcHmacStateT = {
  cbcHmacToken: null,
};

export const cbcHmacReducer = createReducer(
  initState,
  on(CbcHmacActT.SET_CBC_HMAC, (state: CbcHmacStateT, action: CbcHmacNullableT) => ({
    ...state,
    cbcHmac: action.cbcHmacToken,
  }))
);
