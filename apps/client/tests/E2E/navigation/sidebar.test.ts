import test, { Browser } from '@playwright/test';
import { LibTests } from '../lib_tests';

test('ok', async ({ browser }: { browser: Browser }) => {
  const lib: LibTests = await LibTests.fromBrowser(browser);

  await lib.nav('/');
});
