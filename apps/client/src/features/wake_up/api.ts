import { UsePlatformSvc } from '@/core/hooks/use_platform';
import { ApiSvc } from '@/core/store/api/api';
import { ResApiT } from '@/core/store/api/etc/types';
import { ArgsApi } from '@/core/store/api/requests/args_api';
import { inject, Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { WakeUpSlice } from './slice';
import { Prs } from '@/core/lib/data_structure/formatters';
import { WakeUpStateT } from './reducer/reducer';
import { ToastSlice } from '../toast/slice';

@Injectable({
  providedIn: 'root',
})
export class WakeUpApiSvc {
  private readonly api: ApiSvc = inject(ApiSvc);
  private readonly usePlatform: UsePlatformSvc = inject(UsePlatformSvc);
  private readonly wakeUpSlice: WakeUpSlice = inject(WakeUpSlice);
  private readonly toastSlice: ToastSlice = inject(ToastSlice);

  private wakeUp(): Observable<ResApiT<void>> {
    return this.api.get(ArgsApi.withURL('/wake-up').toastOnOk());
  }

  // eslint-disable-next-line no-magic-numbers
  private readonly MAX_CALLS: number = 5;

  private runIf(): boolean {
    if (this.usePlatform.isServer) return false;

    const { lastCall }: WakeUpStateT = this.wakeUpSlice.wakeUpState();

    const now: number = Date.now();
    // eslint-disable-next-line no-magic-numbers
    const MS_OFFSET: number = Prs.minutesToMs(15);
    if (now - lastCall < MS_OFFSET) return false;

    return true;
  }

  public poll(): void {
    if (!this.runIf()) return;

    this.wakeUp()
      .pipe(
        retry({
          delay: 1000,
          count: this.MAX_CALLS,
          resetOnSuccess: false,
        })
      )
      .subscribe({
        next: (res: ResApiT<void>) => {
          this.wakeUpSlice.setLastCall(Date.now());

          this.toastSlice.openToast({
            msg: res.msg as string,
            eventT: 'OK',
            status: res.status,
          });
        },
        error: () => {
          if (!this.toastSlice.toastState().isToast)
            this.toastSlice.openToast({
              msg: 'server not available',
              status: 500,
              eventT: 'ERR',
            });
        },
      });
  }
}
