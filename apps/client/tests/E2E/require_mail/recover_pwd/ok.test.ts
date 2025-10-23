import test, { Browser, Locator } from '@playwright/test';
import { preRequireMail } from '../pre';
import { DataFieldT } from 'tests/E2E/lib_tests/etc/types';
import { LibConstTests } from 'tests/E2E/lib_tests/etc/constants';

test('ok', async ({ browser }: { browser: Browser }) => {
  const { lib, res } = await preRequireMail(browser);

  await lib.nav('/auth/require-email/recover-pwd');
  const form: Locator = await lib.byIdInPage('mail_recover_pwd_form');

  const data: DataFieldT = {
    field: 'email',
    val: res.user.email,
  };

  await lib.fillWith(form, data);

  const submit: Locator = await lib.byIdIn(form, 'mail_recover_pwd_form__submit');
  await submit.click();

  await lib.waitPushTo('/notice');
  await lib.isToastOk();
  await lib.txtInPage(LibConstTests.RECOVER_PWD_MSG);
});
