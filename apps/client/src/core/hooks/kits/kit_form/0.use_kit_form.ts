import { inject, Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiTrackerSvc } from '@/core/store/api/etc/tracker';
import { ZodCheck } from '@/core/paperwork/zod_check';
import { UseNoticeKitSvc } from '@/features/notice/etc/use_notice_kit';
import { Observable } from 'rxjs';

@Injectable()
export abstract class UseKitFormSvc {
  // ? expected to be present
  public abstract form: FormGroup;

  // ? svc
  public readonly apiTracker: ApiTrackerSvc = inject(ApiTrackerSvc);
  protected readonly useNoticeKit: UseNoticeKitSvc = inject(UseNoticeKitSvc);

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
