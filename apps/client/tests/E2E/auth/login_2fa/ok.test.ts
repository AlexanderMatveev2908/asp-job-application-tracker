import test, { Browser } from '@playwright/test';
import { LibTests } from 'tests/E2E/lib_tests';
import { TkResT } from 'tests/E2E/lib_tests/etc/types';

test('ok', async ({ browser }: { browser: Browser }) => {
  const _lib: LibTests = await LibTests.fromBrowser(browser);
  const res: TkResT = await _lib.getTk({ use2FA: true });

  // ? simple login
  const lib: LibTests = await LibTests.fromBrowser(browser);
  await lib.login(res);

  await lib.waitPushTo('/auth/login-2fa');
});
