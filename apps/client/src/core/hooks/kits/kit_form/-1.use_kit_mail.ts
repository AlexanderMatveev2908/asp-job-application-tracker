import { inject, Injectable } from '@angular/core';
import { RequireMailApiSvc } from '@/features/require_mail/api';
import { UseKitSideApiSvc } from '@/core/services/use_kit_side_api';

@Injectable()
export abstract class UseKitMailFormHk {
  protected readonly requireMailAPi: RequireMailApiSvc = inject(RequireMailApiSvc);
  protected readonly useNoticeKit: UseKitSideApiSvc = inject(UseKitSideApiSvc);
}
