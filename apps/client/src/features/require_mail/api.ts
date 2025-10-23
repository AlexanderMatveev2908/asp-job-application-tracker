import { ApiSvc } from '@/core/store/api/api';
import { inject, Injectable } from '@angular/core';
import { ObsResT } from '@/core/store/api/etc/types';
import { ApiArgs } from '@/core/store/api/etc/request/args';
import { MailFormT } from '@/core/forms/mail/etc/paperwork/form_mng';

@Injectable({
  providedIn: 'root',
})
export class RequireMailApiSvc {
  private readonly base: string = '/require-email';
  private readonly api: ApiSvc = inject(ApiSvc);

  public confMail(body: MailFormT): ObsResT<void> {
    return this.api.post(
      ApiArgs.withURL(`${this.base}/confirm-email`).body(body).toastOnFulfilled()
    );
  }

  public recoverPwd(body: MailFormT): ObsResT<void> {
    return this.api.post(ApiArgs.withURL(`${this.base}/recover-pwd`).body(body).toastOnFulfilled());
  }
}
