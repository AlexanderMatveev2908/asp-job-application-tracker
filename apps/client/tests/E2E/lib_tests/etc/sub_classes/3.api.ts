import { TkResT } from '../types';
import { LibToastTests } from './2.toast';
import { RegisterFormT } from '@/features/auth/pages/register/paperwork/form_mng';
import { APIResponse, expect, Locator } from '@playwright/test';
import { Reg } from '@/core/paperwork/reg';
import { TokenT } from '@/features/cbcHmac/etc/types';

export interface GetTokensArgT {
  payload?: Omit<RegisterFormT, 'password' | 'confirmPassword' | 'terms'>;
  verify?: boolean;
  tokenT?: TokenT;
}

export abstract class LibApiTests extends LibToastTests {
  private async hasTokens(data: TkResT): Promise<void> {
    await expect(data.accessToken).toMatch(Reg.JWT);
    await expect(data.refreshToken).toMatch(Reg.JWE);
    await expect(data.cbcHmacToken).toMatch(Reg.CBC_HMAC);
  }

  private async saveJwt(jwt: string): Promise<void> {
    await this.page.evaluate((token: string) => {
      sessionStorage.setItem('accessToken', token);
    }, jwt);
  }

  public async getTk(args?: GetTokensArgT): Promise<TkResT> {
    await this.nav('/');

    let url: string = this.backUrl + `/test/user`;
    url += `?verifyUser=${!!args?.verify}`;
    url += `&tokenT=${args?.tokenT ?? TokenT.CONF_EMAIL}`;

    const res: APIResponse = await this.page.request.post(url, {
      data: {
        existingPayload: args?.payload ?? null,
      },
    });

    const data: TkResT = await res.json();

    await this.hasTokens(data);
    await this.saveJwt(data.accessToken);

    return data;
  }

  public async getAccessAccount(pwd: string): Promise<Locator> {
    await this.nav('/user/manage-account');
    await this.waitPushTo('/user/access-manage-account');

    this.setFormID('access_manage_acc_form');
    const form: Locator = await this.getForm();

    await this.fillWith(form, {
      field: 'password',
      val: pwd,
    });

    await this.submit();

    await this.waitPushTo('/user/manage-account');

    const swapper: Locator = await this.byIdInPage('manage_account__swapper');

    return swapper;
  }
}
