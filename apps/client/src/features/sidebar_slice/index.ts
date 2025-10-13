import { inject, Injectable, Signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { getSideState } from './reducer/selectors';
import { SideStateT } from './reducer/reducer';
import { SidebarActT } from './reducer/actions';
import { StoreStateT } from '@/core/store';

@Injectable({
  providedIn: 'root',
})
export class SidebarSlice {
  private readonly store: Store<StoreStateT> = inject(Store<StoreStateT>);

  public get sideState(): Signal<SideStateT> {
    return this.store.selectSignal(getSideState);
  }

  public toggle(): void {
    this.store.dispatch(SidebarActT.TOGGLE());
  }

  public close(): void {
    this.store.dispatch(SidebarActT.CLOSE());
  }
}
