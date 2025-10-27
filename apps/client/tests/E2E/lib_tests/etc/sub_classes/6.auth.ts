import { Locator } from '@playwright/test';
import { DataFieldT, TkResT } from '../types';
import { LibApiTests } from './5.api';
import { Nullable } from '@/common/types/etc';

export abstract class LibAuthTests extends LibApiTests {
  private totpFormID: Nullable<string> = null;
  private bkpFormID: Nullable<string> = null;

  public setForm2faIDs(id: string): void {
    this.setSwapperID(id);
    const swapperID: string = this.getSwapperID()!;
    this.totpFormID = `${swapperID}__totp_form`;
    this.bkpFormID = `${swapperID}__bkp_form`;
  }

  public async getTotpForm(): Promise<Locator> {
    const swapper: Locator = await this.getSwapper();
    return await this.byIdIn(swapper, this.totpFormID!);
  }

  public async getBkpForm(): Promise<Locator> {
    const swapper: Locator = await this.getSwapper();
    return await this.byIdIn(swapper, this.bkpFormID!);
  }

  public async login(res: TkResT): Promise<void> {
    await this.nav('/auth/login');

    this.setFormID('login_form');
    const form: Locator = await this.getForm();

    const fields: DataFieldT[] = [
      {
        field: 'email',
        val: res.user.email,
      },
      {
        field: 'password',
        val: res.plainPwd,
      },
    ];

    await this.fillFor(form, fields);
    await this.submit();
  }

  public async submitTotp(): Promise<void> {
    this.setFormID(this.totpFormID!);
    await this.submit();
  }
}
