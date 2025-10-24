import { inject, Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiTrackerSvc } from '@/core/store/api/etc/tracker';
import { ZodCheck } from '@/core/paperwork/zod_check';
import { UseNoticeKitSvc } from '@/features/notice/etc/use_notice_kit';
import { Observable } from 'rxjs';
import { Nullable } from '@/common/types/etc';
import { LibEtc } from '@/core/lib/etc';
import { ShapeCheck } from '@/core/lib/data_structure/shape_check';

export interface SubmitSwapArgT {
  fields: string[][];
  setSwapOnErr: (idx: number) => void;
  cb: (data: unknown) => Observable<unknown>;
}

@Injectable()
export abstract class UseKitFormSvc extends ApiTrackerSvc {
  // ? expected to be present
  public abstract form: FormGroup;

  // ? svc
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

    this.track(cb(this.form.value)).subscribe();
  };

  protected readonly submitSwapForm: (arg: SubmitSwapArgT) => void = (arg: SubmitSwapArgT) => {
    if (!this.form.valid) {
      ZodCheck.onSubmitFailedInSwap(this.form, (first: string) => {
        const target: Nullable<number> = LibEtc.idxIn(first, arg.fields);

        if (!ShapeCheck.isNone(target)) arg.setSwapOnErr(target!);
      });

      return;
    }

    this.track(arg.cb(this.form.value)).subscribe();
  };
}
