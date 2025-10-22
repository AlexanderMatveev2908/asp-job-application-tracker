import { ApiSvc } from '@/core/store/api/api';
import { ObsOnOkT } from '@/core/store/api/etc/types';
import { inject, Injectable } from '@angular/core';
import { JwtResT } from '../auth/etc/types';
import { ApiArgs } from '@/core/store/api/etc/request/args';

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
}
