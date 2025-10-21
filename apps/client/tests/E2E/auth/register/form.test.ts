import test, { Browser, expect, Locator } from '@playwright/test';
import { FillInputT } from 'tests/E2E/lib_tests/etc/types';
import { preRegister } from './pre';

const swap_0: FillInputT[] = [
  {
    field: 'first_name',
    val: '<><>',
  },
  {
    field: 'last_name',
    val: '<><>',
  },
  {
    field: 'email',
    val: '@not@an<><>email',
  },
];
const swap_1: FillInputT[] = [
  {
    field: 'password',
    val: 'not safe',
  },
  {
    field: 'confirm_password',
    val: 'different',
  },
];

test('trigger errors', async ({ browser }: { browser: Browser }) => {
  const { lib, form } = await preRegister(browser);

  const [firstName, lastName] = await lib.errFor(form, swap_0);

  const prev: Locator = await lib.byIdIn(form, 'register_form__prev_swap');
  await expect(prev).toBeDisabled();

  const next: Locator = await lib.byIdIn(form, 'register_form__next_swap');
  await expect(next).toBeEnabled();
  await next.click();
  await lib.timer();

  const pwd: Locator = await lib.byIdIn(form, 'password');
  await lib.isFocused(pwd);

  await lib.errFor(form, swap_1);

  const mainBtn: Locator = await lib.byIdIn(form, 'register_form__submit');
  await mainBtn.click();
  await lib.timer();
  await lib.isFocused(firstName);

  await firstName.fill('John');
  await next.click();
  await lib.timer();
  await mainBtn.click();

  await lib.isFocused(lastName);
});
