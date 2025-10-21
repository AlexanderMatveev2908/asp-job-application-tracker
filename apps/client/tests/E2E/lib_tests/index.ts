import { Browser, BrowserContext, Page } from '@playwright/test';
import { LibToastTests } from './etc/sub_classes/2.toast';

export class LibTests extends LibToastTests {
  public static async fromBrowser(browser: Browser): Promise<LibTests> {
    const newCtx: BrowserContext = await browser.newContext();
    const page: Page = await newCtx.newPage();

    return new LibTests(page);
  }
}
