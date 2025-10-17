import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ZodSafeParseResult, ZodType } from 'zod';

type FormGroupControls = AbstractControl & { controls: AbstractControl[] };

export const checkZ =
  (schema: ZodType): ValidatorFn =>
  (control: AbstractControl): ValidationErrors | null => {
    const res: ZodSafeParseResult<unknown> = schema.safeParse(control.value);
    if (res.success) return null;

    for (const ctrl of Object.values((control as FormGroupControls).controls)) ctrl.setErrors(null);

    const errs: Record<string, string> = {};

    for (const issue of res.error.issues) {
      const path: string = issue.path.join('.');
      errs[path] = issue.message;

      const sub: AbstractControl | null = control.get(path);
      if (sub) sub.setErrors({ zod: issue.message });
    }

    return errs;
  };
