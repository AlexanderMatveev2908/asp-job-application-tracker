import { Browser } from '@playwright/test';
import { LibTests } from 'tests/E2E/lib_tests';
import { PreTestResT, TkResT } from 'tests/E2E/lib_tests/etc/types';

export const preTestLogin = async (brw: Browser): Promise<PreTestResT> => {
  const lib: LibTests = await LibTests.fromBrowser(brw);

  await lib.nav('/');

  const res: TkResT = await lib.getTk();

  return {
    lib,
    res,
  };
};
