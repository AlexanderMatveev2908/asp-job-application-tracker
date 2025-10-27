import { Browser, BrowserContext, Locator, Page } from '@playwright/test';
import { GetTokensArgT } from './etc/sub_classes/5.api';
import { PreTestResT, TkResT } from './etc/types';
import { LibAuthTests } from './etc/sub_classes/6.auth';

export class LibTests extends LibAuthTests {
  public static async fromBrowser(browser: Browser): Promise<LibTests> {
    const newCtx: BrowserContext = await browser.newContext();
    const page: Page = await newCtx.newPage();

    return new LibTests(page);
  }

  public static async withAccessAccount(
    brw: Browser,
    opt?: Pick<GetTokensArgT, 'tokenT' | 'verify'>
  ): Promise<PreTestResT<{ swapper: Locator }>> {
    const lib: LibTests = await this.fromBrowser(brw);
    const res: TkResT = await lib.getTk({ tokenT: opt?.tokenT, verify: !!opt?.verify });
    const swapper: Locator = await lib.getAccessAccount(res.plainPwd);

    return {
      lib,
      swapper,
      res,
    };
  }
}
