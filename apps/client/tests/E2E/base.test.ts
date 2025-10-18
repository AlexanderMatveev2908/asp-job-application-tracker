import { Page, test } from '@playwright/test';

test('basic', async ({ page }: { page: Page }) => {
  await page.goto('/');
});
