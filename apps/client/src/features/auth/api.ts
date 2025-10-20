import { ApiSvc } from '@/core/store/api/api';
import { ObsResT } from '@/core/store/api/etc/types';
import { inject, Injectable } from '@angular/core';
import { RegisterResT } from './etc/types';
import { ApiArgs } from '@/core/store/api/etc/request/args';
import { RegisterFormT } from './register/paperwork/form_mng';

@Injectable({
  providedIn: 'root',
})
export class AuthApiSvc {
  private readonly url: string = '/auth';
  private readonly api: ApiSvc = inject(ApiSvc);

  public register(body: RegisterFormT): ObsResT<RegisterResT> {
    return this.api.post(ApiArgs.withURL(`${this.url}/register`).body(body).toastOnFulfilled());
  }
}
