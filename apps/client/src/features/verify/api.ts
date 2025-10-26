import { ApiSvc } from '@/core/store/api/api';
import { ObsOnOkT } from '@/core/store/api/etc/types';
import { inject, Injectable } from '@angular/core';
import { JwtResT } from '../auth/etc/types';
import { ApiArgs } from '@/core/store/api/etc/request/args';

export interface RecoverPwdResT {
  strategy2FA: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class VerifyApiSvc {
  private readonly base: string = '/verify';
  private readonly api: ApiSvc = inject(ApiSvc);

  public confMail(cbcHmacToken: string): ObsOnOkT<JwtResT> {
    return this.api.get(
      ApiArgs.withURL(`${this.base}/confirm-email`)
        .query({
          cbcHmacToken,
        })
        .toastOnFulfilled()
        .pushOnErr()
    );
  }

  public recoverPwd(cbcHmacToken: string): ObsOnOkT<RecoverPwdResT> {
    return this.api.get(
      ApiArgs.withURL(`${this.base}/recover-pwd`)
        .query({
          cbcHmacToken,
        })
        .toastOnFulfilled()
        .pushOnErr()
    );
  }

  public confNewMail(cbcHmacToken: string): ObsOnOkT<JwtResT> {
    return this.api.get(
      ApiArgs.withURL(`${this.base}/new-email`)
        .query({
          cbcHmacToken,
        })
        .toastOnFulfilled()
        .pushOnErr()
    );
  }
}
