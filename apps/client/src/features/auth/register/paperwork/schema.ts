import { PairPwdArgT, UserZod } from '@/core/paperwork/user';
import z from 'zod';

export const registerSchema = UserZod.namesSchema
  .extend(UserZod.mailSchema.shape)
  .extend(UserZod.pairPwdSchema.shape)
  .extend({
    terms: z
      .boolean()
      .nullable()
      .refine(Boolean, { message: 'Terms must be accepted', path: ['terms'] }),
  })
  .refine((data: PairPwdArgT) => UserZod.refinePairPwd(data), {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });
