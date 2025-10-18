import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ZodSafeParseResult, ZodType } from 'zod';
import { ShapeCheck } from '../lib/data_structure/shape';

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

  public static onSubmitFailed(form: FormGroup): void {
    let first: string | null = null;

    for (const [keyCtrl, ctrl] of Object.entries(form.controls)) {
      const err: string | null = form.errors?.[keyCtrl];

      if (!ShapeCheck.isStr(err)) continue;

      if (!first) first = keyCtrl;

      ctrl.markAsDirty();
      ctrl.markAsTouched();
      ctrl.setErrors({ zod: err });
    }

    const elDOM: HTMLElement | null = document.querySelector(`[data-field=${first}]`);

    if (elDOM) elDOM.focus();
  }
}

type FormGroupControls = AbstractControl & { controls: AbstractControl[] };
