import test, { Browser, Locator } from '@playwright/test';
import { preVerifyTest } from '../pre';
import { TokenT } from '@/features/cbcHmac/etc/types';
import { DataFieldT } from 'tests/E2E/lib_tests/etc/types';
import { PwdGen } from '@/common/components/hoc/pair_pwd/pwd_generator/etc/pwd_gen';

test('ok', async ({ browser }: { browser: Browser }) => {
  const { lib, res } = await preVerifyTest(browser, TokenT.RECOVER_PWD);

  await lib.nav(`/verify?cbcHmacToken=${res.cbcHmacToken}`);
  await lib.waitPushTo('/auth/recover-pwd');
  await lib.isToastOk();

  const form: Locator = await lib.byIdInPage('recover_pwd_form');
  // eslint-disable-next-line no-magic-numbers
  const newPwd: string = PwdGen.pwdOf(4);
  const data: DataFieldT[] = [
    {
      field: 'password',
      val: newPwd,
    },
    {
      field: 'confirm_password',
      val: newPwd,
    },
  ];
  await lib.fillFor(form, data);

  const submit: Locator = await lib.byIdIn(form, 'recover_pwd_form__submit');
  await submit.click();
  await lib.waitPushTo('/notice');
  await lib.isToastOk();
});
