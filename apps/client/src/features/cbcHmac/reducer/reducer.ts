import { createReducer, on } from '@ngrx/store';
import { Nullable } from '@/common/types/etc';
import { CbcHmacActT, DeletingCbcHmacArgT } from './actions';
import { CbcHmacNullableT } from '../etc/types';

export interface CbcHmacStateT {
  cbcHmacToken: Nullable<string>;
  deleting: boolean;
}

export const initState: CbcHmacStateT = {
  cbcHmacToken: null,
  deleting: false,
};

export const cbcHmacReducer = createReducer(
  initState,
  on(CbcHmacActT.SET_CBC_HMAC, (state: CbcHmacStateT, action: CbcHmacNullableT) => ({
    ...state,
    cbcHmacToken: action.cbcHmacToken,
  })),
  on(CbcHmacActT.SET_DELETING, (state: CbcHmacStateT, action: DeletingCbcHmacArgT) => ({
    ...state,
    deleting: action.deleting,
  }))
);
