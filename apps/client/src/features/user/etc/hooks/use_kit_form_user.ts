import { CbcHmacSlice } from '@/features/cbcHmac/slice';
import { inject, Injectable } from '@angular/core';
import { UseUserKitSvc } from '../services/use_user_kit';
import { UseKitSideApiSvc } from '@/core/services/use_kit_side_api';

@Injectable()
export abstract class UseKitFormUserHk {
  protected readonly useKitSideApi: UseKitSideApiSvc = inject(UseKitSideApiSvc);
  protected readonly useKitUser: UseUserKitSvc = inject(UseUserKitSvc);
  protected readonly cbcHmacSlice: CbcHmacSlice = inject(CbcHmacSlice);
}
