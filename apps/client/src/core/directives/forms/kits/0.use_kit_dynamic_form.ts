import { ZodCheck } from '@/core/paperwork/zod_check';
import { UseApiTrackerHk } from '@/core/store/api/etc/hooks/use_tracker';
import { UseNoticeKitSvc } from '@/features/notice/etc/use_notice_kit';
import { Directive, inject, input, InputSignal } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Directive()
export abstract class UseKitDynamicFormDir {
  // ? expected to be present
  public form: InputSignal<FormGroup> = input.required();

  // ? svc
  public readonly apiTracker: UseApiTrackerHk = inject(UseApiTrackerHk);
  protected readonly useNoticeKit: UseNoticeKitSvc = inject(UseNoticeKitSvc);

  // ? helpers
  public readonly getCtrl: (name: string) => FormControl = (name: string) =>
    this.form().get(name) as FormControl;

  protected readonly submitForm: (cb: (data: unknown) => Observable<unknown>) => void = (
    cb: (data: unknown) => Observable<unknown>
  ) => {
    if (!this.form().valid) {
      ZodCheck.onSubmitFailed(this.form());
      return;
    }

    this.apiTracker.track(cb(this.form().value)).subscribe();
  };
}
