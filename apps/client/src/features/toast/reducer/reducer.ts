import { createReducer, on } from '@ngrx/store';
import { ToastActT } from './actions';
import { AppEventPayload } from '@/common/types/events';
import { v4 } from 'uuid';
import { IdPayloadT } from '@/common/types/etc';

export interface ToastStateT extends AppEventPayload {
  id: string;
  isToast: boolean;
}

export const initState: ToastStateT = {
  id: '',
  eventT: 'OK',
  status: 0,
  isToast: false,
  msg: '',
};

export const toastReducer = createReducer(
  initState,
  on(ToastActT.OPEN_TOAST, (_: ToastStateT, action: AppEventPayload) => ({
    id: v4(),
    eventT: action.eventT,
    msg: action.msg,
    status: action.status,
    isToast: true,
  })),
  on(ToastActT.SET_ID, (state: ToastStateT, action: IdPayloadT) => ({ ...state, id: action.id })),
  on(ToastActT.CLOSE_TOAST, (state: ToastStateT) => ({ ...state, id: '', isToast: false }))
);
