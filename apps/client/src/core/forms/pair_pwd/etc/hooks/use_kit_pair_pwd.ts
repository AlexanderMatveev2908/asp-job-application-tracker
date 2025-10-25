import { inject, Injectable } from '@angular/core';
import { CbcHmacSlice } from '@/features/cbcHmac/slice';
import { UseNoticeKitSvc } from '@/features/notice/etc/use_notice_kit';

@Injectable()
export abstract class UseKitPairPwdFormHk {
  protected readonly cbcHmacSlice: CbcHmacSlice = inject(CbcHmacSlice);
  protected readonly useNoticeKit: UseNoticeKitSvc = inject(UseNoticeKitSvc);
}
