import { Directive, inject } from '@angular/core';
import { CbcHmacSlice } from '@/features/cbcHmac/slice';
import { UseNoticeKitSvc } from '@/features/notice/etc/use_notice_kit';

@Directive()
export abstract class UsePairPwfFormDir {
  protected readonly cbcHmacSlice: CbcHmacSlice = inject(CbcHmacSlice);
  protected readonly useNoticeKit: UseNoticeKitSvc = inject(UseNoticeKitSvc);
}
