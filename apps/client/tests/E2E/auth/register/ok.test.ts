import test, { Browser, Locator } from '@playwright/test';
import { preRegister } from './pre';
import { TestPayload } from 'tests/E2E/lib_tests/etc/payloads';
import { FillInputT } from 'tests/E2E/lib_tests/etc/types';
import { RegisterFormT } from '@/features/auth/pages/register/paperwork/form_mng';

const payload: Omit<RegisterFormT, 'terms' | 'confirmPassword'> = TestPayload.register();

const swap_0: FillInputT[] = [
  {
    field: 'first_name',
    val: payload.firstName,
  },
  {
    field: 'last_name',
    val: payload.lastName,
  },
  {
    field: 'email',
    val: payload.email,
  },
];

const swap_1: FillInputT[] = [
  {
    field: 'password',
    val: payload.password,
  },
  {
    field: 'confirm_password',
    val: payload.password,
  },
];

const mailMsg: string = `We've sent you an email to confirm your account. If you don't see it, check your spam folder, it might be partying there 🎉`;

test('ok', async ({ browser }: { browser: Browser }) => {
  const { lib, form } = await preRegister(browser);

  await lib.fillFor(form, swap_0);

  const nextSwap: Locator = await lib.byIdIn(form, 'register_form__next_swap');
  await nextSwap.click();

  await lib.fillFor(form, swap_1);

  const terms: Locator = await lib.byIdIn(form, 'terms');
  await terms.click();

  const mainBtn: Locator = await lib.byIdIn(form, 'register_form__submit');
  await mainBtn.click();

  await lib.waitPushTo('/notice');
  await lib.isToastOk();
  await lib.txtInPage(mailMsg);
});
