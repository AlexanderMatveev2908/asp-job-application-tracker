import { Locator } from '@playwright/test';
import { DataFieldT, TkResT } from '../types';
import { LibApiTests } from './5.api';

export abstract class LibAuthTests extends LibApiTests {
  public setTotpFormID(id: string): void {
    this.setSwapperID(id);
    const swapperID: string = this.getSwapperID()!;
    this.setFormID(`${swapperID}__totp_form`);
  }

  public setBkpFormID(id: string): void {
    this.setSwapperID(id);
    const swapperID: string = this.getSwapperID()!;
    this.setFormID(`${swapperID}__totp_form`);
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
}
