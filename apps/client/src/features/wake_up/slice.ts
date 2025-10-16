import { inject, Injectable, Signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { StoreStateT } from '@/core/store';
import { WakeUpStateT } from './reducer/reducer';
import { getWakeUpState } from './reducer/selectors';
import { WakeUpActT } from './reducer/actions';

@Injectable({
  providedIn: 'root',
})
export class WakeUpSlice {
  private readonly store: Store<StoreStateT> = inject(Store<StoreStateT>);

  public get wakeUpState(): Signal<WakeUpStateT> {
    return this.store.selectSignal(getWakeUpState);
  }

  public setLastCall(tmsp: number): void {
    this.store.dispatch(WakeUpActT.SET_LAST_CALL({ tmsp }));
  }
}
