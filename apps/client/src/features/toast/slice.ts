import { inject, Injectable, Signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { StoreStateT } from '@/core/store';
import { ToastStateT } from './reducer/reducer';
import { getToastState } from './reducer/selectors';
import { ToastActT } from './reducer/actions';
import { AppEventPayloadT } from '@/core/lib/dom/meta_event/etc/types';

@Injectable({
  providedIn: 'root',
})
export class ToastSlice {
  private readonly store: Store<StoreStateT> = inject(Store<StoreStateT>);

  public get toastState(): Signal<ToastStateT> {
    return this.store.selectSignal(getToastState);
  }

  public set toastID(id: string) {
    this.store.dispatch(ToastActT.SET_ID({ id }));
  }

  public openToast(arg: AppEventPayloadT): void {
    this.store.dispatch(ToastActT.OPEN_TOAST(arg));
  }

  public closeToast(): void {
    this.store.dispatch(ToastActT.CLOSE_TOAST());
  }

  public ifNotPresent(arg: AppEventPayloadT): void {
    if (this.toastState().isToast) return;

    this.openToast(arg);
  }
}
