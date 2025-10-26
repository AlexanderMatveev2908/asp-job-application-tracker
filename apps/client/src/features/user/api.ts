import { ApiSvc } from '@/core/store/api/api';
import { ObsOnOkT, ObsResT, StatusT } from '@/core/store/api/etc/types';
import { inject, Injectable } from '@angular/core';
import { ResProfileT } from './etc/types';
import { ApiArgs } from '@/core/store/api/etc/request/args';
import { PwdFormT } from '@/core/paperwork/etc/pwd';
import { CbcHmacMandatoryT } from '../cbcHmac/etc/types';
import { MailFormT } from '@/core/paperwork/etc/mail';

export interface ChangeMailFormT extends MailFormT {
  cbcHmacToken: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserApiSvc {
  private readonly api: ApiSvc = inject(ApiSvc);
  private readonly base: string = '/user';

  public getUser(): ObsResT<ResProfileT> {
    return this.api.get(ApiArgs.withURL(`${this.base}/profile`).toastOnErr());
  }

  public getAccessAccount(body: PwdFormT): ObsResT<CbcHmacMandatoryT> {
    return this.api.post(
      ApiArgs.withURL(`${this.base}/manage-account`).body(body).toastOnFulfilled()
    );
  }

  public changeMail(body: ChangeMailFormT): ObsOnOkT<void> {
    return this.api.patch(
      ApiArgs.withURL(`${this.base}/change-email`)
        .body(body)
        .toastOnFulfilled()
        .pushOnStatus([StatusT.UNAUTHORIZED])
    );
  }
}
