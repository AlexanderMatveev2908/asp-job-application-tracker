import { ApiSvc } from '@/core/store/api/api';
import { inject, Injectable } from '@angular/core';
import { RequireMailFormT } from '../auth/pages/req_mail/conf_mail/paperwork/form_mng';
import { ObsResT } from '@/core/store/api/etc/types';
import { ApiArgs } from '@/core/store/api/etc/request/args';

@Injectable({
  providedIn: 'root',
})
export class RequireMailApiSvc {
  private readonly base: string = '/require-email';
  private readonly api: ApiSvc = inject(ApiSvc);

  public confMail(body: RequireMailFormT): ObsResT<void> {
    return this.api.post(
      ApiArgs.withURL(`${this.base}/confirm-email`).body(body).toastOnFulfilled()
    );
  }
}
