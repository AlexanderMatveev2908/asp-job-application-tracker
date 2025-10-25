import { Nullable } from '@/common/types/etc';
import { MailFormMng, MailFormT } from '@/core/paperwork/etc/mail';
import { ZodCheck } from '@/core/paperwork/zod_check';
import { FormControl, FormGroup } from '@angular/forms';
import { ZodObject, ZodString } from 'zod';

export class ChangeMailFormMng extends ZodCheck {
  public static readonly schema: (existing: Nullable<string>) => ZodObject<{ email: ZodString }> = (
    existing: Nullable<string>
  ) =>
    MailFormMng.schema.refine((data: MailFormT) => (!existing ? true : data.email !== existing), {
      message: 'New Email must be different from old one',
      path: ['email'],
    });

  public static readonly form: (existing: Nullable<string>) => FormGroup = (
    existing: Nullable<string>
  ) =>
    new FormGroup(
      {
        email: new FormControl(''),
      },
      { validators: this.checkZ(this.schema(existing)) }
    );
}
