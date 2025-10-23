import { TkResT } from '../types';
import { LibToastTests } from './2.toast';
import { RegisterFormT } from '@/features/auth/pages/register/paperwork/form_mng';
import { APIResponse, expect } from '@playwright/test';
import { Reg } from '@/core/paperwork/reg';
import { TokenT } from '@/features/cbcHmac/etc/types';

export interface GetTokensArgT {
  payload?: Omit<RegisterFormT, 'confirmPassword' | 'terms'>;
  verify?: boolean;
  tokenT: TokenT;
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
}
