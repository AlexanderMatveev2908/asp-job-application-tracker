import test, { Browser, Locator } from '@playwright/test';
import { DataFieldT } from 'tests/E2E/lib_tests/etc/types';
import { preRequireMail } from '../pre';
import { LibConstTests } from 'tests/E2E/lib_tests/etc/constants';

test('ok', async ({ browser }: { browser: Browser }) => {
  const { lib, res } = await preRequireMail(browser);

  await lib.nav('/auth/require-email/confirm-email');
  const form: Locator = await lib.byIdInPage('mail_form');

  const data: DataFieldT = {
    field: 'email',
    val: res.user.email,
  };

  await lib.fillWith(form, data);

  const submit: Locator = await lib.byIdIn(form, 'mail_form__submit');
  await submit.click();
  await lib.waitPushTo('/notice');
  await lib.isToastOk();
  await lib.txtInPage(LibConstTests.CONF_ACCOUNT_MSG);
});
