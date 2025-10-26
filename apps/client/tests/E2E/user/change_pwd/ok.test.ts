import test, { Browser } from '@playwright/test';
import { LibTests } from 'tests/E2E/lib_tests';

test('ok', async ({ browser }: { browser: Browser }) => {
  const { lib, res, swapper } = await LibTests.withAccessAccount(browser);
});
