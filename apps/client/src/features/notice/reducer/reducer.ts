import { createReducer, on } from '@ngrx/store';
import { NoticeActT } from './actions';
import { GenericVoidCbT } from '@/common/types/etc';
import { AppEventPayloadT } from '@/core/lib/dom/meta_event/etc/types';

export type TmptNotice = 'mail';

export interface NoticeStateT extends AppEventPayloadT {
  cb: GenericVoidCbT | null;
  tmpt: TmptNotice | null;
}

export const initState: NoticeStateT = {
  msg: '',
  status: 0,
  eventT: 'NONE',
  cb: null,
  tmpt: null,
};

export type NoticeWithoutCb = Omit<NoticeStateT, 'cb'>;

export const noticeReducer = createReducer(
  initState,
  on(NoticeActT.SET_NOTICE, (_: NoticeStateT, action: NoticeStateT) => ({
    ...action,
  }))
);
