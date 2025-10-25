import { inject, Injectable } from '@angular/core';
import { RequireMailApiSvc } from '@/features/require_mail/api';
import { UseNoticeKitSvc } from '@/features/notice/etc/use_notice_kit';

@Injectable()
export abstract class UseKitMailFormHk {
  protected readonly requireMailAPi: RequireMailApiSvc = inject(RequireMailApiSvc);
  protected readonly useNoticeKit: UseNoticeKitSvc = inject(UseNoticeKitSvc);
}
