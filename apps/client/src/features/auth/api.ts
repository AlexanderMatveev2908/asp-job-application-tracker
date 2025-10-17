import { ApiSvc } from '@/core/store/api/api';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthApiSvc {
  private readonly api: ApiSvc = inject(ApiSvc);
}
