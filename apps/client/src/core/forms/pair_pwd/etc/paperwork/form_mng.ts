import { PairPwdArgT, UserZod } from '@/core/paperwork/user';
import { ZodCheck } from '@/core/paperwork/zod_check';
import { FormControl, FormGroup } from '@angular/forms';
import { ZodObject, ZodString } from 'zod';

export class PairPwdFormMng extends ZodCheck {
  public static readonly schema: ZodObject<{
    password: ZodString;
    confirmPassword: ZodString;
  }> = UserZod.pairPwdSchema.refine((data: PairPwdArgT) => UserZod.refinePairPwd(data), {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

  public static readonly form: () => FormGroup = () =>
    new FormGroup(
      {
        password: new FormControl(''),
        confirmPassword: new FormControl(''),
      },
      {
        validators: this.checkZ(this.schema),
      }
    );
}
