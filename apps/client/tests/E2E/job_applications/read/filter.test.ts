import test, { Browser, Locator } from '@playwright/test';
import { preReadApplications } from './pre';

test('ok', async ({ browser }: { browser: Browser }) => {
  const { lib, applications, gridWrapper } = await preReadApplications(browser);

  const btnOpenFilterBar: Locator = await lib.byIdInPage('open_filter_bar');
  await btnOpenFilterBar.click();

  const filterBar: Locator = await lib.byIdInPage('filter_bar');
  const closeBtn: Locator = await lib.byIdIn(filterBar, 'close_filter_bar');
});
