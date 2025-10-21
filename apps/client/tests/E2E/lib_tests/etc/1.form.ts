import { expect, Locator } from '@playwright/test';
import { LibRootTests } from './0.root';
import { TriggerErrT } from './types';

export abstract class LibFormTests extends LibRootTests {
  public async errWhen(form: Locator, errors: TriggerErrT[]): Promise<void> {
    for (const err of errors) {
      const field: Locator = await this.byIdIn(form, err.field);
      await field.fill(err.val);
      const errField: Locator = await this.byIdIn(form, `err__${err.field}`);
      await expect(errField).toHaveCSS('opacity', '1');
    }
  }
}
