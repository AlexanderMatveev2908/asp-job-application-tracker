import { PwdGen } from '@/common/components/hoc/pair_pwd/pwd_generator/etc/pwd_gen';
import { RegisterFormT } from '@/features/auth/register/paperwork/form_mng';
import { faker } from '@faker-js/faker';

export class Payloads {
  public static register(): Omit<RegisterFormT, 'terms' | 'confirmPassword'> {
    const charsForRange: number = 4;

    return {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      password: PwdGen.pwdOf(charsForRange),
    };
  }
}
