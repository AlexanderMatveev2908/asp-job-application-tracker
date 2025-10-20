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

  public get _noticeState(): Signal<NoticeStateT> {
    return this.store.selectSignal(getNoticeState);
  }

  private set _noticeState(arg: Omit<NoticeStateT, 'cb'> & { cb?: GenericVoidCbT }) {
    const { cb, ...rst } = arg;

    this.store.dispatch(
      NoticeActT.SET_NOTICE({
        ...rst,
        cb: typeof cb === 'function' ? cb : null,
      })
    );

    this.useStorage.setItem('notice', rst);
  }

  public set withCb(arg: Omit<NoticeStateT, 'cb'> & { cb: GenericVoidCbT }) {
    this._noticeState = arg;
  }

  public set notice(arg: Omit<NoticeStateT, 'cb'>) {
    this._noticeState = arg;
  }

  public set mailNotice(arg: Omit<NoticeStateT, 'cb'>) {
    this._noticeState = {
      ...arg,
      msg: `We've sent you an email ${arg.msg}. If you don't see it, check your spam folder, it might be partying there 🎉`,
    };
  }
}
