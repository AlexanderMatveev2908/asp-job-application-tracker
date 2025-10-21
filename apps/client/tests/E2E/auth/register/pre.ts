import { Browser, Locator } from '@playwright/test';
import { LibTests } from 'tests/E2E/lib_tests';

export interface PreRegisterReturnT {
  lib: LibTests;
  form: Locator;
}

export const preRegister = async (browser: Browser): Promise<PreRegisterReturnT> => {
  const lib: LibTests = await LibTests.fromBrowser(browser);

  await lib.nav('/auth/register');
  await lib.closeToastIfPresent();
  const form: Locator = await lib.byIdInPage('register_form');

  return {
    lib,
    form,
  };
};
