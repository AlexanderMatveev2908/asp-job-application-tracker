/* eslint-disable @typescript-eslint/switch-exhaustiveness-check */
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { PageWrapper } from '@/layout/page_wrapper/page-wrapper';
import { UseNavSvc } from '@/core/hooks/use_nav/use_nav';
import { Nullable } from '@/common/types/etc';
import { ToastSlice } from '@/features/toast/slice';
import { NoticeSlice } from '@/features/notice/slice';
import { AppEventPayloadT } from '@/core/lib/dom/meta_event/etc/types';
import { Reg } from '@/core/paperwork/reg';
import { CbcHmacTk } from '@/core/lib/data_structure/cbc_hmac';
import { AadCbcHmacT, TokenT } from '@/common/types/tokens';
import { VerifyApiSvc } from '@/features/verify/api';
import { ErrApp } from '@/core/lib/err';
import { AuthSlice } from '@/features/auth/slice';
import { from, switchMap, tap } from 'rxjs';
import { ResApiT } from '@/core/store/api/etc/types';
import { JwtResT } from '@/features/auth/etc/types';
import { UseInjCtx } from '@/core/directives/use_inj_ctx';

@Component({
  selector: 'app-verify',
  imports: [PageWrapper],
  templateUrl: './verify.html',
  styleUrl: './verify.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Verify extends UseInjCtx implements OnInit {
  private readonly useNav: UseNavSvc = inject(UseNavSvc);
  private readonly toastSlice: ToastSlice = inject(ToastSlice);
  private readonly noticeSlice: NoticeSlice = inject(NoticeSlice);
  private readonly verifyApi: VerifyApiSvc = inject(VerifyApiSvc);
  private readonly authSlice: AuthSlice = inject(AuthSlice);
  private readonly verifyTokenT: Set<TokenT> = new Set<TokenT>([
    TokenT.CONF_EMAIL,
    TokenT.RECOVER_PWD,
  ]);

  private run: boolean = false;

  private extractAad(cbcHmac: Nullable<string>): Nullable<AadCbcHmacT> {
    const missing: boolean = !cbcHmac;
    const invalid: boolean = !Reg.isCbcHmac(cbcHmac);
    const aad: Nullable<AadCbcHmacT> = CbcHmacTk.aadFrom(cbcHmac!);

    if (missing || invalid || !aad || !this.verifyTokenT.has(aad.tokenT)) {
      const payload: AppEventPayloadT = {
        eventT: 'ERR',
        msg: `Token ${missing ? 'not provided' : 'invalid'}`,
        status: 401,
      };

      this.noticeSlice.notice = payload;
      this.toastSlice.ifNotPresent(payload);

      void this.useNav.replace('/notice', { from: 'not_allowed' });

      return null;
    }

    return aad;
  }

  ngOnInit(): void {
    this.usePlatform.onClient(() => {
      if (this.run) return;
      this.run = true;

      const cbcHmac: Nullable<string> = this.useNav.query()?.['cbcHmacToken'];

      const aad: Nullable<AadCbcHmacT> = this.extractAad(cbcHmac);
      if (!aad) return;

      switch (aad.tokenT) {
        case TokenT.CONF_EMAIL:
          this.verifyApi
            .confMail(cbcHmac!)
            .pipe(
              tap((res: ResApiT<JwtResT>) => this.authSlice.loginTmr(res.accessToken)),
              switchMap((_: ResApiT<JwtResT>) => from(this.useNav.replace('/')))
            )
            .subscribe();
          break;

        case TokenT.RECOVER_PWD:
          void null;
          break;

        default:
          throw new ErrApp('bug checking token');
      }
    });
  }
}
