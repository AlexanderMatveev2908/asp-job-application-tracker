import { noticeReducer, NoticeStateT } from '@/features/notice/reducer/reducer';
import { sideReducer, SideStateT } from '@/features/sidebar/reducer/reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface StoreStateT {
  side: SideStateT;
  notice: NoticeStateT;
}

export const rootReducer: ActionReducerMap<StoreStateT> = {
  side: sideReducer,
  notice: noticeReducer,
};
