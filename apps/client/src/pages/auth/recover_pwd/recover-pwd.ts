import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CsrWithTitle } from '@/common/components/hoc/page/csr_with_title/csr-with-title';
import { AuthFormShape } from '@/features/auth/components/form_shape/auth-form-shape';
import { UsePairPwfFormDir } from '@/core/forms/pair_pwd/etc/directives/use_pair_pwd';
import { FormPairPwd } from '@/core/forms/pair_pwd/form-pair-pwd';
import { UseInjCtxSvc } from '@/core/hooks/platform/use_inj_ctx';
import { TokenT } from '@/features/cbcHmac/etc/types';
import { UseAuthKitSvc } from '@/features/auth/etc/use_auth_kit';
import { Nullable } from '@/common/types/etc';
import { ErrApp } from '@/core/lib/err';
import { PairPwdFormT } from '@/core/forms/pair_pwd/etc/paperwork/form_mng';
import { catchError, EMPTY, tap, throwError } from 'rxjs';
import { ErrApiT, ResApiT, StatusT } from '@/core/store/api/etc/types';
import { JwtResT } from '@/features/auth/etc/types';

@Component({
  selector: 'app-recover-pwd',
  imports: [CsrWithTitle, AuthFormShape, FormPairPwd],
  templateUrl: './recover-pwd.html',
  styleUrl: './recover-pwd.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UseInjCtxSvc],
})
export class RecoverPwd extends UsePairPwfFormDir implements OnInit {
  private readonly useInj: UseInjCtxSvc = inject(UseInjCtxSvc);
  private readonly useAuthKit: UseAuthKitSvc = inject(UseAuthKitSvc);

  public readonly onSubmit: () => void = () => {
    const cbcHmacToken: Nullable<string> = this.cbcHmacSlice.cbcHmac();
    if (!cbcHmacToken) throw new ErrApp('bug cbc hmac submit form recover pwd');

    this.submitForm((data: unknown) =>
      this.useAuthKit.authApi
        .recoverPwd({
          cbcHmacToken,
          password: (data as PairPwdFormT).password,
        })
        .pipe(
          tap((res: ResApiT<JwtResT>) => {
            this.useAuthKit.authSlice.login(res.accessToken, true);
            this.cbcHmacSlice.clearCbcHmac(true);

            this.useNoticeKit.pushNotice({
              eventT: 'OK',
              msg: 'Password updated',
              status: 200,
            });
          }),
          catchError((err: ErrApiT<void>) => {
            if (err.status !== StatusT.UNAUTHORIZED) return throwError(() => err);

            this.cbcHmacSlice.clearCbcHmac(true);
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
    this.useInj.useEffect(() => {
      this.useNoticeKit.useNav.ifPathStartsWith('/auth/recover-pwd', () => {
        void this.cbcHmacSlice.cbcHmac();

        // ! right after success i delete cbc and to avoid being pushed away i use an internal flag to have a short window to go instead to notice page
        // | i used same strategy for auth in auth out
        if (
          this.useNoticeKit.useNav.allowedFrom() &&
          this.cbcHmacSlice.isTypeOrClearing(TokenT.RECOVER_PWD)
        )
          return;

        void this.useNoticeKit.useNav.replace('/');
      });
    });
  }
}
