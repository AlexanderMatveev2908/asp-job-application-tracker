import { UseApiSvc } from '@/core/store/api/use_api';
import { ObsOnOkT, ObsResT, StatusT } from '@/core/store/api/etc/types';
import { inject, Injectable } from '@angular/core';
import { ResProfileT } from './etc/types';
import { PwdFormT } from '@/core/paperwork/etc/pwd';
import { CbcHmacMandatoryT } from '../cbcHmac/etc/types';
import { MailFormT } from '@/core/paperwork/etc/mail';
import { LibApiArgs } from '@/core/store/api/etc/lib/req_args/args';

export interface ChangeMailFormT extends MailFormT {
  cbcHmacToken: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserApiSvc {
  private readonly api: UseApiSvc = inject(UseApiSvc);
  private readonly base: string = '/user';

  public getUser(): ObsResT<ResProfileT> {
    return this.api.get(LibApiArgs.withURL(`${this.base}/profile`).toastOnErr());
  }

  public getAccessAccount(body: PwdFormT): ObsResT<CbcHmacMandatoryT> {
    return this.api.post(
      LibApiArgs.withURL(`${this.base}/manage-account`).body(body).toastOnFulfilled()
    );
  }

  public changeMail(body: ChangeMailFormT): ObsOnOkT<void> {
    return this.api.patch(
      LibApiArgs.withURL(`${this.base}/change-email`)
        .body(body)
        .toastOnFulfilled()
        .pushOnStatus([StatusT.UNAUTHORIZED])
    );
  }
}
