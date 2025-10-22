import { PwdGen } from '@/common/components/hoc/pair_pwd/pwd_generator/etc/pwd_gen';
import { LoginFormT } from '@/features/auth/pages/login/paperwork/from_mng';
import { RegisterFormT } from '@/features/auth/pages/register/paperwork/form_mng';
import { faker } from '@faker-js/faker';

export class TestPayload {
  // eslint-disable-next-line no-magic-numbers
  private static readonly charsForRange: number = 4;

  public static register(): Omit<RegisterFormT, 'terms' | 'confirmPassword'> {
    return {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      password: PwdGen.pwdOf(this.charsForRange),
    };
  }

  public static login(): LoginFormT {
    return {
      email: faker.internet.email(),
      password: PwdGen.pwdOf(this.charsForRange),
    };
  }
}
