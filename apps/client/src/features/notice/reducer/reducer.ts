import { createReducer, on } from '@ngrx/store';
import { NoticeActT } from './actions';
import { AppEventPayload } from '@/common/types/events';

export interface NoticeStateT extends AppEventPayload {
  cb: (() => void | (() => Promise<void>)) | null;
}

export const initState: NoticeStateT = {
  msg: '',
  status: 0,
  eventT: 'NONE',
  cb: null,
};

export const noticeReducer = createReducer(
  initState,
  on(NoticeActT.SET_NOTICE, (_: NoticeStateT, action: NoticeStateT) => ({
    ...action,
  }))
);
