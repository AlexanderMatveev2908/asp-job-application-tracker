import { UseApiSvc } from '@/core/store/api/use_api';
import { ApiArgs } from '@/core/store/api/etc/req_args/args';
import { ObsResT } from '@/core/store/api/etc/types';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TestApiSvc {
  private readonly base: string = '/test';
  private readonly api: UseApiSvc = inject(UseApiSvc);

  public protectedData(): ObsResT<void> {
    return this.api.get(ApiArgs.withURL(`${this.base}/protected`).toastOnFulfilled());
  }
}
