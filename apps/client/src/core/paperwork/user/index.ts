import { z } from 'zod';
import { Reg } from '../reg';

const MAX_CHARS_TXT: number = 100;
const MAX_CHARS_MAIL: number = 254;

export const nameSchema = z.object({
  firstName: z
    .string()
    .min(1, 'First Name required')
    .max(MAX_CHARS_TXT, 'Max length exceeded')
    .regex(Reg.NAME, 'First Name invalid'),
  lastName: z
    .string()
    .min(1, 'Last Name required')
    .max(MAX_CHARS_TXT, 'Max length exceeded')
    .regex(Reg.NAME, 'Last Name invalid'),
});

export const emailSchema = z.object({
  email: z
    .string()
    .min(1, 'Email required')
    .max(MAX_CHARS_MAIL, 'Max length exceeded')
    .regex(Reg.MAIL, 'Email Invalid'),
});

export const pwdSchema = z.object({
  password: z
    .string()
    .min(1, 'Password required')
    .max(MAX_CHARS_TXT, 'Max length exceeded')
    .regex(Reg.PWD),
});

export const pairPwdSchema = pwdSchema
  .extend({
    confirmPassword: z.string().min(1, 'Confirm password required'),
  })
  .refine(
    // eslint-disable-next-line @typescript-eslint/typedef
    (data) => {
      const { password, confirmPassword } = data;

      return password === confirmPassword;
    },
    {
      path: ['confirmPassword'],
      message: 'Passwords do not match',
    }
  );
