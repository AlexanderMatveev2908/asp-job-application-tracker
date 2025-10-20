import { PairPwdArgT, UserZod } from '@/core/paperwork/user';
import { ZodCheck } from '@/core/paperwork/zod_check';
import { FormControl, FormGroup } from '@angular/forms';
import z, { ZodBoolean, ZodNullable, ZodObject, ZodString } from 'zod';

export class RegisterFormMng extends ZodCheck {
  public static readonly schema: ZodObject<{
    firstName: ZodString;
    lastName: ZodString;
    email: ZodString;
    password: ZodString;
    confirmPassword: ZodString;
    terms: ZodBoolean | ZodNullable;
  }> = UserZod.namesSchema
    .extend(UserZod.mailSchema.shape)
    .extend(UserZod.pairPwdSchema.shape)
    .extend({
      terms: z.boolean().nullable().refine(Boolean, { message: 'Terms must be accepted' }),
    })
    .refine((data: PairPwdArgT) => UserZod.refinePairPwd(data), {
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    });

  public static readonly form: FormGroup = new FormGroup(
    {
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      confirmPassword: new FormControl(''),
      terms: new FormControl(null),
    },
    {
      validators: this.checkZ(this.schema),
    }
  );

  public static readonly fieldsBySwap: string[][] = [
    ['firstName', 'lastName', 'email'],
    ['password', 'confirmPassword', 'terms'],
  ];
}
