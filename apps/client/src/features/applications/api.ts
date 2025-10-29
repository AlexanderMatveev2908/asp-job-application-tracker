import { ObsResT, StatusT } from '@/core/store/api/etc/types';
import { UseApiSvc } from '@/core/store/api/use_api';
import { inject, Injectable } from '@angular/core';
import { ApplicationResT } from './etc/types';
import { LibApiArgs } from '@/core/store/api/etc/lib/api_args';

@Injectable({
  providedIn: 'root',
})
export class ApplicationsApiSvc {
  private readonly base: string = '/job-applications';

  private readonly api: UseApiSvc = inject(UseApiSvc);

  public post(formData: FormData): ObsResT<ApplicationResT> {
    return this.api.post(LibApiArgs.withURL(this.base).body(formData).toastOnFulfilled());
  }

  public getByID(id: string): ObsResT<ApplicationResT> {
    return this.api.get(
      LibApiArgs.withURL(`${this.base}/${id}`).toastOnErr().pushOnStatus([StatusT.NOT_FOUND])
    );
  }

  public put(id: string, formData: FormData): ObsResT<ApplicationResT> {
    return this.api.put(LibApiArgs.withURL(`${this.base}/${id}`).body(formData).toastOnFulfilled());
  }
}
