import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { PageWrapper } from '@/layout/page_wrapper/page-wrapper';
import { UseNavSvc } from '@/core/hooks/use_nav/use_nav';
import { Nullable } from '@/common/types/etc';
import { ToastSlice } from '@/features/toast/slice';
import { NoticeSlice } from '@/features/notice/slice';
import { AppEventPayloadT } from '@/core/lib/dom/meta_event/etc/types';
import { Reg } from '@/core/paperwork/reg';
import { CbcHmacTk } from '@/core/lib/data_structure/cbc_hmac';
import { AadCbcHmacT } from '@/common/types/tokens';

@Component({
  selector: 'app-verify',
  imports: [PageWrapper],
  templateUrl: './verify.html',
  styleUrl: './verify.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Verify implements OnInit {
  private readonly useNav: UseNavSvc = inject(UseNavSvc);
  private readonly toastSlice: ToastSlice = inject(ToastSlice);
  private readonly noticeSlice: NoticeSlice = inject(NoticeSlice);

  ngOnInit(): void {
    const cbcHmac: Nullable<string> = this.useNav.query()?.['cbcHmacToken'];

    const missing: boolean = !cbcHmac;
    const invalid: boolean = !Reg.isCbcHmac(cbcHmac);

    if (missing || invalid) {
      const payload: AppEventPayloadT = {
        eventT: 'ERR',
        msg: `Token ${missing ? 'not provided' : 'invalid'}`,
        status: 401,
      };

      this.noticeSlice.notice = payload;
      this.toastSlice.ifNotPresent(payload);
    }

    const aad: Nullable<AadCbcHmacT> = CbcHmacTk.aadFrom(cbcHmac!);

    console.log(aad);
  }
}
