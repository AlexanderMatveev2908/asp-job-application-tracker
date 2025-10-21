import { Injectable, Signal } from '@angular/core';
import { UserStateT } from './reducer/reducer';
import { getUserState } from './reducer/selectors';
import { UseKitSliceSvc } from '@/core/hooks/use_kit_slice';

@Injectable({
  providedIn: 'root',
})
export class UserSlice extends UseKitSliceSvc {
  public get userState(): Signal<UserStateT> {
    return this.store.selectSignal(getUserState);
  }
}
