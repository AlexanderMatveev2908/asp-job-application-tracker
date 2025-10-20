import { ApiSvc } from '@/core/store/api/api';
import { ResApiT } from '@/core/store/api/etc/types';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterResT } from './etc/types';
import { ArgsApi } from '@/core/store/api/etc/request/args_api';
import { RegisterFormT } from './register/paperwork/form_mng';

@Injectable({
  providedIn: 'root',
})
export class AuthApiSvc {
  private readonly url: string = '/auth';
  private readonly api: ApiSvc = inject(ApiSvc);

  protected register(body: RegisterFormT): Observable<ResApiT<RegisterResT>> {
    return this.api.post(ArgsApi.withURL(`${this.url}/register`).body(body).toastOnFulfilled());
  }
}
