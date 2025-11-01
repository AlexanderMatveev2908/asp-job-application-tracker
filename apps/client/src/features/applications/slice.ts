import { computed, Injectable, Signal } from '@angular/core';
import { ApplicationsStateT } from './reducer/reducer';
import { getApplicationsState } from './reducer/selectors';
import { UseKitSliceHk } from '@/core/hooks/kits/use_kit_slice';
import { ApplicationsActT } from './reducer/actions';
import { ApplicationT } from './etc/types';

@Injectable({
  providedIn: 'root',
})
export class ApplicationsSlice extends UseKitSliceHk {
  public get applicationsState(): Signal<ApplicationsStateT> {
    return this.store.selectSignal(getApplicationsState);
  }

  public applications: Signal<ApplicationsStateT['applications']> = computed(
    () => this.applicationsState().applications
  );

  public keyRefresh: Signal<number> = computed(() => this.applicationsState().keyRefresh);

  public saveApplications(applications: ApplicationT[]): void {
    this.store.dispatch(ApplicationsActT.SET_APPLICATIONS({ applications }));
  }

  public triggerKeyRefresh(): void {
    this.store.dispatch(ApplicationsActT.TRIGGER_KEY_REFRESH());
  }

  public reset(): void {
    this.store.dispatch(ApplicationsActT.RESET_APPLICATIONS());
  }
}
