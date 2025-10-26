import { Nullable } from '@/common/types/etc';
import { UseNavSvc } from '@/core/services/use_nav/use_nav';
import { LibCbcHmac } from '@/features/cbcHmac/etc/lib';
import { AppEventPayloadT } from '@/core/lib/dom/meta_event/etc/types';
import { Reg } from '@/core/paperwork/reg';
import { AadCbcHmacT, TokenT } from '@/features/cbcHmac/etc/types';
import { NoticeSlice } from '@/features/notice/slice';
import { ToastSlice } from '@/features/toast/slice';
import { Directive, inject } from '@angular/core';

@Directive()
export abstract class UseMngVerifyDir {
  protected readonly toastSlice: ToastSlice = inject(ToastSlice);
  protected readonly noticeSlice: NoticeSlice = inject(NoticeSlice);
  protected readonly useNav: UseNavSvc = inject(UseNavSvc);

  private readonly verifyTokenT: Set<TokenT> = new Set<TokenT>([
    TokenT.CONF_EMAIL,
    TokenT.RECOVER_PWD,
    TokenT.CHANGE_EMAIL,
  ]);

  protected extractAad(cbcHmac: Nullable<string>): Nullable<AadCbcHmacT> {
    const missing: boolean = !cbcHmac;
    const invalid: boolean = !Reg.isCbcHmac(cbcHmac);
    const aad: Nullable<AadCbcHmacT> = LibCbcHmac.aadFrom(cbcHmac!);

    if (missing || invalid || !aad || !this.verifyTokenT.has(aad.tokenT)) {
      const payload: AppEventPayloadT = {
        eventT: 'ERR',
        msg: `Token ${missing ? 'not provided' : 'invalid'}`,
        status: 401,
      };

      this.noticeSlice.notice = payload;
      this.toastSlice.openToast(payload);

      void this.useNav.replace('/notice', { from: 'err' });

      return null;
    }

    return aad;
  }
}
