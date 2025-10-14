import { inject, Injectable, Signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { StoreStateT } from '@/core/store';
import { getNoticeState } from './reducer/selectors';
import { NoticeStateT } from './reducer/reducer';
import { NoticeActT } from './reducer/actions';

@Injectable({
  providedIn: 'root',
})
export class NoticeSlice {
  private readonly store: Store<StoreStateT> = inject(Store<StoreStateT>);

  public get noticeState(): Signal<NoticeStateT> {
    return this.store.selectSignal(getNoticeState);
  }

  public set noticeState(arg: NoticeStateT) {
    this.store.dispatch(NoticeActT.SET_NOTICE(arg));
  }
}
