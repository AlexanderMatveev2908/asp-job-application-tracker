import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CsrWithTitle } from '@/common/components/hoc/page/csr_with_title/csr-with-title';
import { UseKitPairPwdFormSvc } from '@/core/hooks/kits/kit_form/-1.use_kit_pair_pwd';
import { FormPairPwd } from '@/core/forms/pair_pwd/form-pair-pwd';
import { TokenT } from '@/features/cbcHmac/etc/types';
import { UseAuthKitSvc } from '@/features/auth/etc/use_auth_kit';
import { Nullable } from '@/common/types/etc';
import { ErrApp } from '@/core/lib/err';
import { PairPwdFormT } from '@/core/forms/pair_pwd/etc/paperwork/form_mng';
import { catchError, EMPTY, Observable, tap, throwError } from 'rxjs';
import { ErrApiT, ResApiT, StatusT } from '@/core/store/api/etc/types';
import { JwtResT } from '@/features/auth/etc/types';
import { UseRouteMngSvc } from '@/core/hooks/use_route_mng';

@Component({
  selector: 'app-recover-pwd',
  imports: [CsrWithTitle, FormPairPwd],
  templateUrl: './recover-pwd.html',
  styleUrl: './recover-pwd.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UseRouteMngSvc],
})
export class RecoverPwd extends UseKitPairPwdFormSvc implements OnInit {
  private readonly routerProtection: UseRouteMngSvc = inject(UseRouteMngSvc);
  private readonly useAuthKit: UseAuthKitSvc = inject(UseAuthKitSvc);

  public readonly strategy: (data: PairPwdFormT) => Observable<unknown> = (data: PairPwdFormT) => {
    const cbcHmacToken: Nullable<string> = this.cbcHmacSlice.cbcHmac();
    return !cbcHmacToken
      ? throwError(
          () =>
            new ErrApp(
              'bug => missing cbc_hmac and still user submit form recover_pwd',
              StatusT.UNAUTHORIZED
            )
        )
      : this.useAuthKit.authApi
          .recoverPwd({
            cbcHmacToken,
            password: data.password,
          })
          .pipe(
            tap((res: ResApiT<JwtResT>) => {
              this.useAuthKit.authSlice.login(res.accessToken, { withTmr: true });
              this.cbcHmacSlice.clearCbcHmac();

              this.useNoticeKit.pushNotice({
                eventT: 'OK',
                msg: 'Password updated',
                status: 200,
              });
            }),
            catchError((err: ErrApiT<void>) => {
              if (err.status !== StatusT.UNAUTHORIZED) return throwError(() => err);

              this.cbcHmacSlice.clearCbcHmac();
              this.useNoticeKit.pushNotice({
                eventT: 'ERR',
                msg: err.error?.msg ?? 'Token invalid',
                status: 401,
              });

              return EMPTY;
            })
          );
  };

  ngOnInit(): void {
    this.routerProtection.pushOutIfNotTokenType('/auth/recover-pwd', TokenT.RECOVER_PWD);
  }
}
