import { Directive, inject } from '@angular/core';
import { RequireMailApiSvc } from '@/features/require_mail/api';
import { UseNoticeKitSvc } from '@/features/notice/etc/use_notice_kit';

@Directive()
export abstract class UseMailFormDir {
  protected readonly requireMailAPi: RequireMailApiSvc = inject(RequireMailApiSvc);
  protected readonly useNoticeKit: UseNoticeKitSvc = inject(UseNoticeKitSvc);
}
