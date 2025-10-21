import { expect, Locator } from '@playwright/test';
import { LibRootTests } from './0.root';
import { TriggerErrT } from './types';

export abstract class LibFormTests extends LibRootTests {
  public async errWhen(form: Locator, errors: TriggerErrT[]): Promise<Locator[]> {
    const locators: Locator[] = [];

    for (const err of errors) {
      const field: Locator = await this.byIdIn(form, err.field);
      locators.push(field);
      await field.fill(err.val);
      const errField: Locator = await this.byIdIn(form, `err__${err.field}`);
      await expect(errField).toHaveCSS('opacity', '1');
    }

    return locators;
  }

  public async isFocused(el: Locator): Promise<void> {
    await expect(el).toBeInViewport();
    await expect(el).toBeFocused();
  }
}
