import { createReducer, on } from '@ngrx/store';
import { ToastActT } from './actions';
import { AppEventPayloadT } from '@/common/types/events';
import { v4 } from 'uuid';
import { WithIdT } from '@/common/types/etc';

export interface ToastStateT extends AppEventPayloadT {
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
  on(ToastActT.OPEN_TOAST, (state: ToastStateT, action: AppEventPayloadT) => ({
    prevID: state.currID,
    currID: v4(),
    eventT: action.eventT,
    msg: action.msg,
    status: action.status,
    isToast: true,
  })),
  on(ToastActT.SET_ID, (state: ToastStateT, action: WithIdT) => ({
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
