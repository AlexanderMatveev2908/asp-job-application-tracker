import { expect, Locator } from '@playwright/test';
import { LibRootTests } from './0.root';
import { DataFieldT } from '../types';

export abstract class LibFormTests extends LibRootTests {
  public async fillWith(form: Locator, data: DataFieldT): Promise<Locator> {
    const field: Locator = await this.byIdIn(form, data.field);
    await field.fill(data.val);

    return field;
  }

  public async errWhen(form: Locator, err: DataFieldT): Promise<Locator> {
    const field: Locator = await this.fillWith(form, err);

    const errField: Locator = await this.byIdIn(form, `err__${err.field}`);
    await expect(errField).toHaveCSS('opacity', '1');

    return field;
  }

  public async errFor(form: Locator, errors: DataFieldT[]): Promise<Locator[]> {
    const locators: Locator[] = [];

    for (const err of errors) {
      const field: Locator = await this.errWhen(form, err);
      locators.push(field);
    }

    return locators;
  }

  public async fillFor(form: Locator, data: DataFieldT[]): Promise<Locator[]> {
    const locators: Locator[] = [];

    for (const f of data) {
      const field: Locator = await this.fillWith(form, f);
      locators.push(field);
    }

    return locators;
  }

  public async isFocused(el: Locator): Promise<void> {
    await expect(el).toBeInViewport();
    await expect(el).toBeFocused();
  }
}
