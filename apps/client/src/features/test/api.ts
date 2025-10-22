import { ApiSvc } from '@/core/store/api/api';
import { ApiArgs } from '@/core/store/api/etc/request/args';
import { ObsResT } from '@/core/store/api/etc/types';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TestApiSvc {
  private readonly base: string = '/test';
  private readonly api: ApiSvc = inject(ApiSvc);

  public protectedData(): ObsResT<void> {
    return this.api.get(ApiArgs.withURL(`${this.base}/protected`).toastOnFulfilled());
  }
}
