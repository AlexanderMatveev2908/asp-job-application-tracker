import { createReducer, on } from '@ngrx/store';
import { ToastActT } from './actions';
import { AppEventPayload } from '@/common/types/events';
import { v4 } from 'uuid';
import { IdPayloadT } from '@/common/types/etc';

export interface ToastStateT extends AppEventPayload {
  currID: string | null;
  prevID: string | null;
  isToast: boolean;
}

export const initState: ToastStateT = {
  currID: null,
  prevID: null,
  eventT: 'OK',
  status: 0,
  isToast: false,
  msg: '',
};

export const toastReducer = createReducer(
  initState,
  on(ToastActT.OPEN_TOAST, (state: ToastStateT, action: AppEventPayload) => ({
    prevID: state.currID,
    currID: v4(),
    eventT: action.eventT,
    msg: action.msg,
    status: action.status,
    isToast: true,
  })),
  on(ToastActT.SET_ID, (state: ToastStateT, action: IdPayloadT) => ({
    ...state,
    prevID: state.currID,
    currID: action.id,
  })),
  on(ToastActT.CLOSE_TOAST, (state: ToastStateT) => ({
    ...state,
    prevID: state.currID,
    currID: null,
    isToast: false,
  }))
);
