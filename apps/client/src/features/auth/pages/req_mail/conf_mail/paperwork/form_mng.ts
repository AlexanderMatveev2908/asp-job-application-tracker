import { UserZod } from '@/core/paperwork/user';
import { ZodCheck } from '@/core/paperwork/zod_check';
import { FormControl, FormGroup } from '@angular/forms';
import z, { ZodObject, ZodString } from 'zod';

export class ConfMailFormMng extends ZodCheck {
  public static readonly schema: ZodObject<{ email: ZodString }> = UserZod.mailSchema;

  public static readonly form: FormGroup = new FormGroup(
    {
      email: new FormControl(''),
    },
    {
      validators: this.checkZ(this.schema),
    }
  );
}

export type RequireMailFormT = z.infer<typeof ConfMailFormMng.schema>;
