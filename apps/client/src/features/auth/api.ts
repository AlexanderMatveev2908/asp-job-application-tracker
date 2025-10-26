import { UseApiSvc } from '@/core/store/api/use_api';
import { ObsResT } from '@/core/store/api/etc/types';
import { inject, Injectable } from '@angular/core';
import { JwtResT, RecoverPwdArgT } from './etc/types';
import { ApiArgs } from '@/core/store/api/etc/req_args/args';
import { RegisterFormT } from './pages/register/paperwork/form_mng';
import { LoginFormT } from './pages/login/paperwork/from_mng';

@Injectable({
  providedIn: 'root',
})
export class AuthApiSvc {
  private readonly base: string = '/auth';
  private readonly api: UseApiSvc = inject(UseApiSvc);

  public register(body: RegisterFormT): ObsResT<JwtResT> {
    return this.api.post(ApiArgs.withURL(`${this.base}/register`).body(body).toastOnFulfilled());
  }

  public login(body: LoginFormT): ObsResT<JwtResT> {
    return this.api.post(ApiArgs.withURL(`${this.base}/login`).body(body).toastOnFulfilled());
  }

  public logout(): ObsResT<void> {
    return this.api.post(ApiArgs.withURL(`${this.base}/logout`).toastOnFulfilled());
  }

  public recoverPwd(arg: RecoverPwdArgT): ObsResT<JwtResT> {
    return this.api.patch(ApiArgs.withURL(`${this.base}/recover-pwd`).body(arg).toastOnFulfilled());
  }
}
