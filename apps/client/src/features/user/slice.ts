import { Injectable, Signal } from '@angular/core';
import { UserStateT } from './reducer/reducer';
import { getUserState } from './reducer/selectors';
import { UseKitSliceSvc } from '@/core/hooks/use_kit_slice';
import { UserT } from './etc/types';
import { UserActT } from './reducer/actions';

@Injectable({
  providedIn: 'root',
})
export class UserSlice extends UseKitSliceSvc {
  public get userState(): Signal<UserStateT> {
    return this.store.selectSignal(getUserState);
  }

  public setUser(user: UserT): void {
    this.store.dispatch(UserActT.SET_USER(user));
  }

  public reset(): void {
    this.store.dispatch(UserActT.RESET());
  }
}
