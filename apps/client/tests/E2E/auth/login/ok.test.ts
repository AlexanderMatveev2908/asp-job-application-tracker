import test, { Browser, Locator } from '@playwright/test';
import { preTestLogin } from './pre';
import { DataFieldT } from 'tests/E2E/lib_tests/etc/types';

test('ok', async ({ browser }: { browser: Browser }) => {
  const { lib, res, form } = await preTestLogin(browser);

  const fields: DataFieldT[] = [
    {
      field: 'email',
      val: res.user.email,
    },
    {
      field: 'password',
      val: res.plainPwd,
    },
  ];

  await lib.fillFor(form, fields);

  const submit: Locator = await lib.byIdIn(form, 'login_form__submit');
  await submit.click();

  await lib.waitPushTo('/');
  await lib.isToastOk();
});
