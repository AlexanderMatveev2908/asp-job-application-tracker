import { UseApiSvc } from '@/core/store/api/use_api';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApplicationsApiSvc {
  private readonly api: UseApiSvc = inject(UseApiSvc);
}
