import { Reg } from '@/core/paperwork/reg';
import { ZodCheck } from '@/core/paperwork/zod_check';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import z, { ZodArray, ZodObject, ZodString } from 'zod';

export class TotpFormMng extends ZodCheck {
  public static readonly schema: ZodObject<{
    totp: ZodArray<ZodString>;
  }> = z
    .object({
      totp: z.array(z.string()),
    })
    .refine((data: TotpFormT) => Reg.isTotpCode(data.totp.join('')), {
      message: 'TOTP code invalid',
      path: ['totp'],
    });

  public static readonly form: () => FormGroup = () =>
    new FormGroup(
      {
        totp: new FormArray(Array.from({ length: 6 }, () => new FormControl(''))),
      },
      {
        validators: this.checkZ(this.schema),
      }
    );
}

export type TotpFormT = z.infer<typeof TotpFormMng.schema>;
