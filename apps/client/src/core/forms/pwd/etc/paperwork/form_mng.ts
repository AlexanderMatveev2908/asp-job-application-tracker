import { UserZod } from '@/core/paperwork/user';
import { ZodCheck } from '@/core/paperwork/zod_check';
import { FormControl, FormGroup } from '@angular/forms';
import z, { ZodObject, ZodString } from 'zod';

export class PwdFormMng extends ZodCheck {
  public static readonly schema: ZodObject<{ password: ZodString }> = UserZod.pwdSchema;

  public static readonly form: () => FormGroup = () =>
    new FormGroup(
      {
        password: new FormControl(''),
      },
      { validators: this.checkZ(this.schema) }
    );
}

export type PwdFormT = z.infer<typeof PwdFormMng.schema>;
