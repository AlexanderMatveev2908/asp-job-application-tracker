/* eslint-disable no-magic-numbers */
import { envVars } from '@/environments/environment._test';
import { expect, Locator, Page } from '@playwright/test';

export abstract class LibRootTests {
  protected readonly URL: string = envVars.frontURL;
  protected readonly TIMEOUT_WAIT_FOR: number = 30 * 1000;
  protected readonly TIMEOUT_PUSH_URL: number = 30 * 1000;
  protected readonly TIMEOUT_PRE_INTERACTION: number = 1000;

  protected readonly page!: Page;
  constructor(page: Page) {
    this.page = page;
  }

  protected async exists(el: Locator): Promise<void> {
    await el.waitFor({ state: 'visible', timeout: this.TIMEOUT_WAIT_FOR });
    await expect(el).toBeVisible();
  }

  public async timer(time: number = 1000): Promise<void> {
    await this.page.waitForTimeout(time);
  }

  public async nav(path: string): Promise<void> {
    await this.page.goto(path);
    await this.page.waitForTimeout(this.TIMEOUT_PRE_INTERACTION);
  }

  public async byCssIn(locator: Locator, cssCls: string): Promise<Locator> {
    const el: Locator = await locator.locator(`.${cssCls}`);
    await this.exists(el);

    return el;
  }

  public async byIdIn(locator: Locator | Page, id: string): Promise<Locator> {
    const el: Locator = locator.getByTestId(id);
    await this.exists(el);

    return el;
  }

  public async byIdInPage(id: string): Promise<Locator> {
    return this.byIdIn(this.page, id);
  }

  public async clickById(id: string): Promise<void> {
    const el: Locator = await this.byIdInPage(id);
    await el.click();
  }

  public async waitPushTo(path: string): Promise<void> {
    await this.page.waitForURL(path, { timeout: this.TIMEOUT_PUSH_URL });
  }
}
