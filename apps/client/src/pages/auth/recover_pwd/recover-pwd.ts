import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CsrWithTitle } from '@/common/components/hoc/page/csr_with_title/csr-with-title';
import { UseKitPairPwdFormHk } from '@/core/forms/pair_pwd/etc/hooks/use_kit_pair_pwd';
import { FormPairPwd } from '@/core/forms/pair_pwd/form-pair-pwd';
import { TokenT } from '@/features/cbcHmac/etc/types';
import { UseAuthKitSvc } from '@/features/auth/etc/use_auth_kit';
import { Nullable } from '@/common/types/etc';
import { PairPwdFormT } from '@/core/forms/pair_pwd/etc/paperwork/form_mng';
import { catchError, EMPTY, Observable, tap, throwError } from 'rxjs';
import { ErrApiT, ResApiT, StatusT } from '@/core/store/api/etc/types';
import { JwtResT } from '@/features/auth/etc/types';
import { UseRouteMngHk } from '@/core/hooks/use_route_mng';
import { LibApiShape } from '@/core/store/api/etc/lib/shape';
import { UseKitStrategyDir } from '@/core/directives/forms/kits/0.use_kit_strategy';
import { UseIDsDir } from '@/core/directives/use_ids';

@Component({
  selector: 'app-recover-pwd',
  imports: [CsrWithTitle, FormPairPwd, UseKitStrategyDir, UseIDsDir],
  templateUrl: './recover-pwd.html',
  styleUrl: './recover-pwd.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UseRouteMngHk],
})
export class RecoverPwd extends UseKitPairPwdFormHk implements OnInit {
  private readonly routerProtection: UseRouteMngHk = inject(UseRouteMngHk);
  private readonly useAuthKit: UseAuthKitSvc = inject(UseAuthKitSvc);

  public readonly strategy: (data: unknown) => Observable<unknown> = (data: unknown) => {
    const cbcHmacToken: Nullable<string> = this.cbcHmacSlice.cbcHmac();

    return LibApiShape.throwIfCbcHmacMissing(
      cbcHmacToken,
      this.useAuthKit.authApi
        .recoverPwd({
          cbcHmacToken: cbcHmacToken!,
          password: (data as PairPwdFormT).password,
        })
        .pipe(
          tap((res: ResApiT<JwtResT>) => {
            this.useAuthKit.authSlice.login(res.accessToken, { startTmr: true });
            this.cbcHmacSlice.clearCbcHmac({ startTmr: true });

            this.useNoticeKit.pushNotice({
              eventT: 'OK',
              msg: 'Password updated',
              status: 200,
            });
          }),
          catchError((err: ErrApiT<void>) => {
            if (err.status !== StatusT.UNAUTHORIZED) return throwError(() => err);

            this.cbcHmacSlice.clearCbcHmac({ startTmr: true });
            this.useNoticeKit.pushNotice({
              eventT: 'ERR',
              msg: err.error?.msg ?? 'Token invalid',
              status: 401,
            });

            return EMPTY;
          })
        )
    );
  };

  ngOnInit(): void {
    this.routerProtection.pushOutIfNotTokenType('/auth/recover-pwd', TokenT.RECOVER_PWD);
  }
}
