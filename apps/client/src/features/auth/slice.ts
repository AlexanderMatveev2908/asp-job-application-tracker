import { inject, Injectable, Signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { StoreStateT } from '@/core/store';
import { AuthStateT } from './reducer/reducer';
import { getAuthState } from './reducer/selectors';

@Injectable({
  providedIn: 'root',
})
export class AuthSlice {
  private readonly store: Store<StoreStateT> = inject(Store<StoreStateT>);

  public get authState(): Signal<AuthStateT> {
    return this.store.selectSignal(getAuthState);
  }
}
