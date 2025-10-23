import { Browser } from '@playwright/test';
import { LibTests } from '../lib_tests';
import { PreTestResT, TkResT } from '../lib_tests/etc/types';

export const preRequireMail = async (brw: Browser): Promise<PreTestResT<void>> => {
  const _lib: LibTests = await LibTests.fromBrowser(brw);
  await _lib.nav('/');
  const res: TkResT = await _lib.getTk({});

  const lib: LibTests = await LibTests.fromBrowser(brw);

  return {
    res,
    lib,
  };
};
