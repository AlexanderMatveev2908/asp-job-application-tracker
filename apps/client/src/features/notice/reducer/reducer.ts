import { createReducer, on } from '@ngrx/store';
import { NoticeActT } from './actions';
import { AppEventPayload } from '@/common/types/events';
import { GenericVoidCbT } from '@/common/types/etc';

export interface NoticeStateT extends AppEventPayload {
  cb: GenericVoidCbT | null;
}

export const initState: NoticeStateT = {
  msg: '',
  status: 0,
  eventT: 'NONE',
  cb: null,
};

export type NoticeWithoutCb = Omit<NoticeStateT, 'cb'>;

export const noticeReducer = createReducer(
  initState,
  on(NoticeActT.SET_NOTICE, (_: NoticeStateT, action: NoticeStateT) => ({
    ...action,
  }))
);
