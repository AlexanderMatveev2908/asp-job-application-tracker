import { ApplicationT } from '@/features/applications/etc/types';
import test, { Browser } from '@playwright/test';
import { LibTests } from 'tests/E2E/lib_tests';
import { TkResT } from 'tests/E2E/lib_tests/etc/types';

test('ok', async ({ browser }: { browser: Browser }) => {
  const lib: LibTests = await LibTests.fromBrowser(browser);
  const resTkt: TkResT = await lib.getTk({ verify: true });

  const applications: ApplicationT[] = [];

  const nApplications: number = 5;
  for (let i = 0; i < nApplications; i++) {
    const newApplication: ApplicationT = await lib.postApplication(resTkt.accessToken);
    applications.push(newApplication);
  }

  await lib.nav('/job-applications');
  await lib.expectHitsToBe(nApplications);
});
