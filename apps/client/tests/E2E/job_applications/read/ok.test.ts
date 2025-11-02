import { Nullable } from '@/common/types/etc';
import { ApplicationT } from '@/features/applications/etc/types';
import test, { Browser, expect, Locator } from '@playwright/test';
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

  const gridWrapper: Locator = await lib.gridSearchWrapper();

  await lib.addAllTxtInputs();

  for (const a of applications) {
    await lib.fillByNameWith({
      field: 'companyName',
      val: a.companyName,
    });
    await lib.fillByNameWith({
      field: 'positionName',
      val: a.positionName,
    });

    const itemDOM: Locator = await lib.byIdIn(gridWrapper, `application_item__${a.id}`);
    const statusWrapDOM: Locator = await lib.byIdIn(itemDOM, 'status_wrap');
    const labelSpan: Locator = await lib.byIdIn(statusWrapDOM, 'span_label');
    const status: Nullable<string> = await labelSpan.textContent();
    await expect(status).toBe(a.status);
  }
});
