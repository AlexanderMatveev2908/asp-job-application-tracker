import { CbcHmacSlice } from '@/features/cbcHmac/slice';
import { inject, Injectable } from '@angular/core';
import { UseUserKitSvc } from './use_user_kit';
import { UseKitSideApiSvc } from '@/core/services/use_kit_side_api';

@Injectable({
  providedIn: 'root',
})
export class UseKitFormUserSvc {
  public readonly useKitSideApi: UseKitSideApiSvc = inject(UseKitSideApiSvc);
  public readonly useKitUser: UseUserKitSvc = inject(UseUserKitSvc);
  public readonly cbcHmacSlice: CbcHmacSlice = inject(CbcHmacSlice);
}
