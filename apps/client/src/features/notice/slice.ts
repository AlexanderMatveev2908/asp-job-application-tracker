import { inject, Injectable, Signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { StoreStateT } from '@/core/store';
import { getNoticeState } from './reducer/selectors';
import { NoticeStateT } from './reducer/reducer';
import { NoticeActT } from './reducer/actions';
import { UseStorageSvc } from '@/core/hooks/use_storage';
import { GenericVoidCbT } from '@/common/types/etc';

@Injectable({
  providedIn: 'root',
})
export class NoticeSlice {
  private readonly store: Store<StoreStateT> = inject(Store<StoreStateT>);
  private readonly useStorage: UseStorageSvc = inject(UseStorageSvc);

  public get noticeState(): Signal<NoticeStateT> {
    return this.store.selectSignal(getNoticeState);
  }

  private set noticeState(arg: Omit<NoticeStateT, 'cb'> & { cb?: GenericVoidCbT }) {
    const { cb, ...rst } = arg;

    this.store.dispatch(
      NoticeActT.SET_NOTICE({
        ...rst,
        cb: typeof cb === 'function' ? cb : null,
      })
    );

    this.useStorage.setItem('NOTICE', rst);
  }

  public set noticeWithCb(arg: Omit<NoticeStateT, 'cb'> & { cb: GenericVoidCbT }) {
    this.noticeState = arg;
  }

  public set noticeWithoutCb(arg: Omit<NoticeStateT, 'cb'> & { cb?: GenericVoidCbT }) {
    this.noticeState = arg;
  }
}
