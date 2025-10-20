import test, { Browser, expect, Locator } from '@playwright/test';
import { LibTests } from '../lib_tests';

test('ok', async ({ browser }: { browser: Browser }) => {
  const lib: LibTests = await LibTests.fromBrowser(browser);

  await lib.nav('/');
  await lib.closeToastIfPresent();

  await lib.clickById('toggle_side_btn');
  await lib.timer();

  const sidebar: Locator = await lib.byIdInPage('sidebar');
  await expect(sidebar).toHaveCSS('opacity', '1');
});
