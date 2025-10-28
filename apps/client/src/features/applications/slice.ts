import { Injectable, Signal } from '@angular/core';
import { ApplicationsStateT } from './reducer/reducer';
import { getApplicationsState } from './reducer/selectors';
import { UseKitSliceHk } from '@/core/hooks/kits/use_kit_slice';

@Injectable({
  providedIn: 'root',
})
export class ApplicationsSlice extends UseKitSliceHk {
  public get applicationsState(): Signal<ApplicationsStateT> {
    return this.store.selectSignal(getApplicationsState);
  }
}
