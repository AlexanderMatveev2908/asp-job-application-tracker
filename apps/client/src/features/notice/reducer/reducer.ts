import { createReducer, on } from '@ngrx/store';
import { NoticeActT } from './actions';
import { AppEvT } from '@/common/types/events';

export interface NoticeStateT {
  msg: string;
  eventT: AppEvT | null;
  status: number;
}

export const initState: NoticeStateT = {
  msg: '',
  status: 500,
  eventT: 'NONE',
};

export const noticeReducer = createReducer(
  initState,
  on(NoticeActT.SET_NOTICE, (_: NoticeStateT, action: NoticeStateT) => ({
    ...action,
  }))
);
