import { inject, Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ZodCheck } from '@/core/paperwork/zod_check';
import { Observable } from 'rxjs';
import { UseKitSideApiSvc } from '@/core/services/use_kit_side_api';
import { UseApiTrackerHk } from '@/core/store/api/etc/hooks/use_tracker';

@Injectable()
export abstract class UseKitFormHk {
  public abstract form: FormGroup;

  protected readonly apiTracker: UseApiTrackerHk = inject(UseApiTrackerHk);
  protected readonly useSideApiKit: UseKitSideApiSvc = inject(UseKitSideApiSvc);

  public readonly getCtrl: (name: string) => FormControl = (name: string): FormControl =>
    this.form.get(name) as FormControl;

  protected readonly submitForm: (cb: (data: unknown) => Observable<unknown>) => void = (
    cb: (data: unknown) => Observable<unknown>
  ): void => {
    if (!this.form.valid) {
      ZodCheck.onSubmitFailed(this.form);
      return;
    }

    this.apiTracker.track(cb(this.form.value)).subscribe();
  };
}
