import { CsrWithTitle } from '@/common/components/hoc/page/csr_with_title/csr-with-title';
import { AuthMailForm } from '@/core/forms/auth_mail/auth-mail-form';
import { UseMailFormDir } from '@/core/forms/mail/etc/directives/use_mail_form';
import { MailFormT } from '@/core/forms/mail/etc/paperwork/form_mng';
import { ResApiT } from '@/core/store/api/etc/types';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-auth-req-mail-recover-pwd',
  imports: [CsrWithTitle, AuthMailForm],
  templateUrl: './auth-req-mail-recover-pwd.html',
  styleUrl: './auth-req-mail-recover-pwd.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthReqMailRecoverPwd extends UseMailFormDir {
  public strategy: (data: MailFormT) => Observable<unknown> = (data: MailFormT) =>
    this.requireMailAPi.recoverPwd(data).pipe(
      tap((_: ResApiT<void>) => {
        this.useNoticeKit.pushMailNotice('to recover your password');
      })
    );
}
