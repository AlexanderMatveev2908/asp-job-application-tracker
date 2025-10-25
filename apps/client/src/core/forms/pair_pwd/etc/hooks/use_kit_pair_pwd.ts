import { inject, Injectable } from '@angular/core';
import { CbcHmacSlice } from '@/features/cbcHmac/slice';
import { UseKitSideApiSvc } from '@/core/services/use_kit_side_api';

@Injectable()
export abstract class UseKitPairPwdFormHk {
  protected readonly cbcHmacSlice: CbcHmacSlice = inject(CbcHmacSlice);
  protected readonly useNoticeKit: UseKitSideApiSvc = inject(UseKitSideApiSvc);
}
