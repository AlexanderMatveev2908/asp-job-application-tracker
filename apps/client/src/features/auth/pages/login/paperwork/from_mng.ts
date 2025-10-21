import { UserZod } from '@/core/paperwork/user';
import { ZodCheck } from '@/core/paperwork/zod_check';
import { FormControl, FormGroup } from '@angular/forms';
import z, { ZodObject, ZodString } from 'zod';

export class LoginFormMng extends ZodCheck {
  public static readonly schema: ZodObject<{ email: ZodString; password: ZodString }> =
    UserZod.mailSchema.extend(UserZod.pwdSchema.shape);

  public static readonly form: FormGroup = new FormGroup(
    {
      email: new FormControl(''),
      password: new FormControl(''),
    },
    {
      validators: this.checkZ(this.schema),
    }
  );
}

export type LoginFormT = z.infer<typeof LoginFormMng.schema>;
