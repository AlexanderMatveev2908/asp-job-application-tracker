import test, { Browser } from '@playwright/test';
import { preTestLogin } from './pre';

test('ok', async ({ browser }: { browser: Browser }) => {
  const { lib, res } = await preTestLogin(browser);
});
