import { Browser, BrowserContext, Page } from '@playwright/test';
import { LibApiTests } from './etc/sub_classes/3.api';

export class LibTests extends LibApiTests {
  public static async fromBrowser(browser: Browser): Promise<LibTests> {
    const newCtx: BrowserContext = await browser.newContext();
    const page: Page = await newCtx.newPage();

    return new LibTests(page);
  }
}
