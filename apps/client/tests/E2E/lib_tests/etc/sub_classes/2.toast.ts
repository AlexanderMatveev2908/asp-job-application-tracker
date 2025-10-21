/* eslint-disable no-magic-numbers */
import { expect, Locator } from '@playwright/test';
import { Nullable } from '@/common/types/etc';
import { Log } from '@/core/lib/dev/log';
import { LibFormTests } from './1.form';

export type ToastExpT = 'ok' | 'err';

export abstract class LibToastTests extends LibFormTests {
  private async getToast(): Promise<Locator> {
    const toast: Locator = await this.byIdInPage('toast');
    return toast;
  }

  private readonly twdGreen600: string = '#16a34a';
  private readonly twdRed600: string = '#dc2626';

  private hexToRgb(hex: string): string {
    const binary: number = parseInt(hex.replace('#', ''), 16);

    const r = (binary >> 16) & 0xff;
    const g = (binary >> 8) & 0xff;
    const b = binary & 0xff;

    return `rgb(${r}, ${g}, ${b})`;
  }

  private async isOfType(successType: boolean): Promise<void> {
    const toast: Locator = await this.getToast();
    const rgb: string = this.hexToRgb(successType ? this.twdGreen600 : this.twdRed600);
    await expect(toast).toHaveCSS('border-color', rgb);

    const txt: Nullable<string> = await toast.evaluate((parent: HTMLElement) => {
      const row = parent.querySelector('.status_row__status');
      return row?.querySelector('span')?.textContent ?? null;
    });

    await expect(txt).toBeTruthy();

    const reg: RegExp = successType ? /^20[01]$/ : /^[45]\d{2}$/;
    await expect(txt).toMatch(reg);
  }

  public async isToastOk(): Promise<void> {
    await this.isOfType(true);
  }

  public async isToastErr(): Promise<void> {
    await this.isOfType(false);
  }

  public async closeToastIfPresent(): Promise<void> {
    try {
      const toast: Locator = await this.page.getByTestId('toast');
      const closeBtn: Locator = await toast.getByTestId('toast__close');

      await expect(closeBtn).toBeInViewport({ timeout: 1000 });

      await closeBtn.click();
    } catch {
      Log.log('ignore if missing');
    }
  }
}
