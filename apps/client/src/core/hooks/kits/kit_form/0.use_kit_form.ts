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
  form: FormGroup;
  fields: string[][];
  setSwapOnErr: (idx: number) => void;
  cb: (data: unknown) => Observable<unknown>;
}

@Injectable()
export abstract class UseKitFormAbsSvc {
  // ? expected to be present
  public abstract form: FormGroup;
  public readonly apiTracker: ApiTrackerSvc = inject(ApiTrackerSvc);

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

    this.apiTracker.track(cb(this.form.value)).subscribe();
  };

  protected readonly submitSwapForm: (arg: SubmitSwapArgT) => void = (arg: SubmitSwapArgT) => {
    if (!this.form.valid) {
      ZodCheck.onSubmitFailedInSwap(this.form, (first: string) => {
        const target: Nullable<number> = LibEtc.idxIn(first, arg.fields);

        if (!ShapeCheck.isNone(target)) arg.setSwapOnErr(target!);
      });

      return;
    }

    this.apiTracker.track(arg.cb(this.form.value)).subscribe();
  };
}

@Injectable()
export class UseKitFormClsSvc {
  // ? svc
  public readonly useNoticeKit: UseNoticeKitSvc = inject(UseNoticeKitSvc);
  public readonly apiTracker: ApiTrackerSvc = inject(ApiTrackerSvc);

  // ? helpers
  public readonly getCtrl: (form: FormGroup, name: string) => FormControl = (
    form: FormGroup,
    name: string
  ) => form.get(name) as FormControl;

  public readonly submitForm: (
    form: FormGroup,
    cb: (data: unknown) => Observable<unknown>
  ) => void = (form: FormGroup, cb: (data: unknown) => Observable<unknown>) => {
    if (!form.valid) {
      ZodCheck.onSubmitFailed(form);
      return;
    }

    this.apiTracker.track(cb(form.value)).subscribe();
  };

  public readonly submitSwapForm: (arg: SubmitSwapArgT) => void = (arg: SubmitSwapArgT) => {
    if (!arg.form.valid) {
      ZodCheck.onSubmitFailedInSwap(arg.form, (first: string) => {
        const target: Nullable<number> = LibEtc.idxIn(first, arg.fields);

        if (!ShapeCheck.isNone(target)) arg.setSwapOnErr(target!);
      });

      return;
    }

    this.apiTracker.track(arg.cb(arg.form.value)).subscribe();
  };
}
