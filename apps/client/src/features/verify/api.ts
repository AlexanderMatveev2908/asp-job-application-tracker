import { UseApiSvc } from '@/core/store/api/use_api';
import { ObsOnOkT } from '@/core/store/api/etc/types';
import { inject, Injectable } from '@angular/core';
import { JwtResT } from '../auth/etc/types';
import { LibApiArgs } from '@/core/store/api/etc/lib/api_args';

export interface RecoverPwdResT {
  strategy2FA: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class VerifyApiSvc {
  private readonly base: string = '/verify';
  private readonly api: UseApiSvc = inject(UseApiSvc);

  public confMail(cbcHmacToken: string): ObsOnOkT<JwtResT> {
    return this.api.get(
      LibApiArgs.withURL(`${this.base}/confirm-email`)
        .query({
          cbcHmacToken,
        })
        .toastOnFulfilled()
        .pushOnErr()
    );
  }

  public recoverPwd(cbcHmacToken: string): ObsOnOkT<RecoverPwdResT> {
    return this.api.get(
      LibApiArgs.withURL(`${this.base}/recover-pwd`)
        .query({
          cbcHmacToken,
        })
        .toastOnFulfilled()
        .pushOnErr()
    );
  }

  public confNewMail(cbcHmacToken: string): ObsOnOkT<JwtResT> {
    return this.api.get(
      LibApiArgs.withURL(`${this.base}/new-email`)
        .query({
          cbcHmacToken,
        })
        .toastOnFulfilled()
        .pushOnErr()
    );
  }
}
