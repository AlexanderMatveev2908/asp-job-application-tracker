import { emailSchema, nameSchema, pairPwdSchema } from '@/core/paperwork/user';
import z from 'zod';

export const registerSchema = nameSchema
  .extend(emailSchema)
  .extend(pairPwdSchema)
  .extend({
    terms: z
      .boolean()
      .nullable()
      .refine(Boolean, { message: 'Terms must be accepted', path: ['terms'] }),
  });
