import { ApiSvc } from '@/core/store/api/api';
import { ObsResT } from '@/core/store/api/etc/types';
import { inject, Injectable } from '@angular/core';
import { ResProfileT } from './etc/types';
import { ApiArgs } from '@/core/store/api/etc/request/args';

@Injectable({
  providedIn: 'root',
})
export class UserApiSvc {
  private readonly api: ApiSvc = inject(ApiSvc);
  private readonly base: string = '/user';

  public getUser(): ObsResT<ResProfileT> {
    return this.api.get(ApiArgs.withURL(`${this.base}/profile`).toastOnErr());
  }
}
