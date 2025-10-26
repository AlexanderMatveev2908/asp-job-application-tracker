import { UseApiSvc } from '@/core/store/api/use_api';
import { ResApiT } from '@/core/store/api/etc/types';
import { ApiArgs } from '@/core/store/api/etc/req_args/args';
import { inject, Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { WakeUpSlice } from './slice';

@Injectable({
  providedIn: 'root',
})
export class WakeUpApiSvc {
  private readonly api: UseApiSvc = inject(UseApiSvc);
  private readonly wakeUpSlice: WakeUpSlice = inject(WakeUpSlice);

  private wakeUp(): Observable<ResApiT<void>> {
    return this.api.get(ApiArgs.withURL('/wake-up').noToast());
  }

  // eslint-disable-next-line no-magic-numbers
  private readonly MAX_CALLS: number = 30;

  public poll(): Observable<ResApiT<void>> {
    return this.wakeUp().pipe(
      retry({
        delay: 1000,
        count: this.MAX_CALLS,
        resetOnSuccess: false,
      })
    );
  }
}
