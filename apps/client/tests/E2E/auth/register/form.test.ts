import test, { Browser, expect, Locator } from '@playwright/test';
import { LibTests } from 'tests/E2E/lib_tests';
import { TriggerErrT } from 'tests/E2E/lib_tests/etc/types';

const swap_0: TriggerErrT[] = [
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
const swap_1: TriggerErrT[] = [
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
  const lib: LibTests = await LibTests.fromBrowser(browser);

  await lib.nav('/auth/register');

  const form: Locator = await lib.byIdInPage('register_form');

  await lib.errWhen(form, swap_0);

  const prev: Locator = await lib.byIdIn(form, 'register_form__prev_swap');
  await expect(prev).toBeDisabled();

  const next: Locator = await lib.byIdIn(form, 'register_form__next_swap');
  await expect(next).toBeEnabled();
  await next.click();
  await lib.timer();

  await lib.errWhen(form, swap_1);

  const mainBtn: Locator = await lib.byIdIn(form, 'register_form__submit');
  await mainBtn.click();
  await lib.timer();
  const firstName: Locator = await lib.byIdIn(form, 'first_name');
  await expect(firstName).toBeInViewport();
  await expect(firstName).toBeFocused();
});
