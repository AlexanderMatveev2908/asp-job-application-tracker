import { ApiSvc } from '@/core/store/api/api';
import { ObsResT } from '@/core/store/api/etc/types';
import { inject, Injectable } from '@angular/core';
import { JwtResT } from './etc/types';
import { ApiArgs } from '@/core/store/api/etc/request/args';
import { RegisterFormT } from './pages/register/paperwork/form_mng';
import { LoginFormT } from './pages/login/paperwork/from_mng';

@Injectable({
  providedIn: 'root',
})
export class AuthApiSvc {
  private readonly base: string = '/auth';
  private readonly api: ApiSvc = inject(ApiSvc);

  public register(body: RegisterFormT): ObsResT<JwtResT> {
    return this.api.post(ApiArgs.withURL(`${this.base}/register`).body(body).toastOnFulfilled());
  }

  public login(body: LoginFormT): ObsResT<JwtResT> {
    return this.api.post(ApiArgs.withURL(`${this.base}/login`).body(body).toastOnFulfilled());
  }
}
