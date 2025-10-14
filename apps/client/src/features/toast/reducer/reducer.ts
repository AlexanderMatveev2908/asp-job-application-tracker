import { createReducer, on } from '@ngrx/store';
import { ToastActT } from './actions';
import { AppEventPayload } from '@/common/types/events';
import { v4 } from 'uuid';
import { IdPayloadT } from '@/common/types/etc';

export interface ToastStateT extends AppEventPayload {
  id: string;
}

export const initState: ToastStateT = {
  id: '',
  eventT: 'NONE',
  status: 0,
  msg: '',
};

export const toastReducer = createReducer(
  initState,
  on(ToastActT.SET_TOAST, (state: ToastStateT, action: AppEventPayload) => ({
    id: v4(),
    eventT: action.eventT,
    msg: action.msg,
    status: action.status,
  })),
  on(ToastActT.SET_ID, (state: ToastStateT, action: IdPayloadT) => ({ ...state, id: action.id }))
);
