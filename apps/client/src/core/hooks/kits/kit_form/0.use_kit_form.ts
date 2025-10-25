import { inject, Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UseApiTrackerHk } from '@/core/store/api/etc/hooks/use_tracker';
import { ZodCheck } from '@/core/paperwork/zod_check';
import { UseKitSideApiSvc } from '@/core/services/use_kit_side_api';
import { Observable } from 'rxjs';

@Injectable()
export abstract class UseKitFormHk {
  // ? expected to be present
  public abstract form: FormGroup;

  // ? svc
  public readonly apiTracker: UseApiTrackerHk = inject(UseApiTrackerHk);
  protected readonly useNoticeKit: UseKitSideApiSvc = inject(UseKitSideApiSvc);

  // ? helpers
  public readonly getCtrl: (name: string) => FormControl = (name: string) =>
    this.form.get(name) as FormControl;

  protected readonly submitForm: (cb: (data: unknown) => Observable<unknown>) => void = (
    cb: (data: unknown) => Observable<unknown>
  ) => {
    if (!this.form.valid) {
      ZodCheck.onSubmitFailed(this.form);
      return;
    }

    this.apiTracker.track(cb(this.form.value)).subscribe();
  };
}
