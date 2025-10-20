import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ZodSafeParseResult, ZodType } from 'zod';
import { ShapeCheck } from '../lib/data_structure/shape_check';
import { Log } from '../lib/dev/log';
import { UseSwapDir } from '../directives/use_swap/use_swap';
import { FocusDOM } from '../lib/dom/focus';

export class ZodCheck {
  public static checkZ(schema: ZodType): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const res: ZodSafeParseResult<unknown> = schema.safeParse(control.value);
      if (res.success) return null;

      for (const ctrl of Object.values((control as FormGroupControls).controls))
        ctrl.setErrors(null);

      const errs: Record<string, string> = {};

      for (const issue of res.error.issues) {
        const path: string = issue.path.join('.');
        errs[path] = issue.message;

        const sub: AbstractControl | null = control.get(path);
        if (sub) sub.setErrors({ zod: issue.message });
      }

      return errs;
    };
  }

  private static _onSubmitFailed(form: FormGroup): string | null {
    let first: string | null = null;

    Log.logTtl('submit failed', form.errors);

    for (const [keyCtrl, ctrl] of Object.entries(form.controls)) {
      const err: string | null = form.errors?.[keyCtrl];
      if (!ShapeCheck.isStr(err)) continue;

      if (!first) first = keyCtrl;

      ctrl.markAsDirty();
      ctrl.markAsTouched();
      ctrl.setErrors({ zod: err });
    }

    return first;
  }

  public static onSubmitFailed(form: FormGroup): void {
    const first: string | null = this._onSubmitFailed(form);
    FocusDOM.byDataField(first);
  }

  // | the job of callback is to manage to set right proper swap
  // | where first error is located
  public static onSubmitFailedInSwap(form: FormGroup, cb: (field: string) => void): void {
    const first: string | null = this._onSubmitFailed(form);
    if (first) cb(first);

    setTimeout(() => {
      FocusDOM.byDataField(first);
    }, UseSwapDir.TIME_ANIMATION);
  }
}

type FormGroupControls = AbstractControl & { controls: AbstractControl[] };
