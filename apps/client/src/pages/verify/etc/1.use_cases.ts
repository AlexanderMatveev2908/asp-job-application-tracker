import { Directive, inject } from '@angular/core';
import { UseMngVerifyDir } from './0.use_mng';
import { UserSlice } from '@/features/user/slice';
import { AuthSlice } from '@/features/auth/slice';
import { RecoverPwdResT, VerifyApiSvc } from '@/features/verify/api';
import { ResApiT } from '@/core/store/api/etc/types';
import { JwtResT } from '@/features/auth/etc/types';
import { from, switchMap, tap } from 'rxjs';
import { CbcHmacSlice } from '@/features/cbcHmac/slice';

@Directive()
export abstract class UseCasesVerifyDir extends UseMngVerifyDir {
  private readonly verifyApi: VerifyApiSvc = inject(VerifyApiSvc);
  private readonly authSlice: AuthSlice = inject(AuthSlice);
  private readonly userSlice: UserSlice = inject(UserSlice);
  private readonly cbcHmacSlice: CbcHmacSlice = inject(CbcHmacSlice);

  protected confMail(cbcHmac: string): void {
    this.verifyApi
      .confMail(cbcHmac)
      .pipe(
        tap((res: ResApiT<JwtResT>) => this.authSlice.login(res.accessToken, { withTmr: true })),
        switchMap((res: ResApiT<JwtResT>) => {
          this.userSlice.triggerApi();

          this.noticeSlice.notice = {
            eventT: 'OK',
            msg: res.msg ?? 'account verified',
            status: 200,
          };

          return from(this.useNav.replace('/notice', { from: 'ok' }));
        })
      )
      .subscribe();
  }

  protected recoverPwd(cbcHmac: string): void {
    this.verifyApi
      .recoverPwd(cbcHmac)
      .pipe(
        tap((_: ResApiT<RecoverPwdResT>) => {
          this.cbcHmacSlice.saveCbcHmac(cbcHmac);
        }),
        switchMap((res: ResApiT<RecoverPwdResT>) => {
          const suffix: string = res.strategy2FA ? '-2fa' : '';

          return from(this.useNav.replace(`/auth/recover-pwd${suffix}`, { from: 'ok' }));
        })
      )
      .subscribe();
  }
}
