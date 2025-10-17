import {
  emailSchema,
  nameSchema,
  PairPwdArgT,
  pairPwdSchema,
  refinePairPwd,
} from '@/core/paperwork/user';
import z from 'zod';

export const registerSchema = nameSchema
  .extend(emailSchema.shape)
  .extend(pairPwdSchema.shape)
  .extend({
    terms: z
      .boolean()
      .nullable()
      .refine(Boolean, { message: 'Terms must be accepted', path: ['terms'] }),
  })
  .refine((data: PairPwdArgT) => refinePairPwd(data), {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });
