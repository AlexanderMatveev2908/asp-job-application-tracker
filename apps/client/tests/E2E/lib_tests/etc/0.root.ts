/* eslint-disable no-magic-numbers */
import { envVars } from '@/environments/environment._test';
import { expect, Locator, Page } from '@playwright/test';

export abstract class LibRootTests {
  protected static readonly URL: string = envVars.frontURL;
  protected static readonly TIMEOUT_WAIT_FOR: number = 30 * 1000;
  protected static readonly TIMEOUT_PRE_INTERACTION: number = 1000;

  protected readonly page!: Page;
  constructor(page: Page) {
    this.page = page;
  }

  public async nav(path: string): Promise<void> {
    await this.page.goto(path);
    await this.page.waitForTimeout(LibRootTests.TIMEOUT_PRE_INTERACTION);
  }

  public async getById(id: string): Promise<Locator> {
    const el: Locator = this.page.getByTestId(id);
    await el.waitFor({ state: 'visible', timeout: LibRootTests.TIMEOUT_WAIT_FOR });
    await expect(el).toBeVisible();

    return el;
  }

  public async clickById(id: string): Promise<void> {
    const el: Locator = await this.getById(id);
    await el.click();
  }
}
