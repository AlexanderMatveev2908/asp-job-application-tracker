import { expect, Locator } from '@playwright/test';
import { LibApplicationsTests } from './8.applications';
import { Nullable } from '@/common/types/etc';
import { LibShapeCheck } from '@/core/lib/data_structure/shape_check';

export abstract class LibSearchTests extends LibApplicationsTests {
  public async searchContent(): Promise<Locator> {
    const wrapper: Locator = await this.byIdInPage('search__content');

    return wrapper;
  }

  private async nHits(): Promise<Nullable<number>> {
    const hitsCounter: Locator = await this.byIdInPage('hits_counter');

    const msgSpan: Locator = await this.byIdIn(hitsCounter, 'hits_counter__val');
    const msg: Nullable<string> = await msgSpan.textContent();

    return LibShapeCheck.isStr(msg) ? +msg! : null;
  }

  public async expectHitsToBe(v: number): Promise<void> {
    const valHits: Nullable<number> = await this.nHits();

    await expect(valHits).not.toBeNull();
    await expect(valHits).toBe(v);
  }
}
