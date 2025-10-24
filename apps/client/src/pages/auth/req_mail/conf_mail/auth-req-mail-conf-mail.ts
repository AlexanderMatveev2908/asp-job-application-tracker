import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CsrWithTitle } from '@/common/components/hoc/page/csr_with_title/csr-with-title';
import { Observable, tap } from 'rxjs';
import { ResApiT } from '@/core/store/api/etc/types';
import { MailFormT } from '@/core/forms/mail/etc/paperwork/form_mng';
import { AuthMailForm } from '@/core/forms/auth_mail/auth-mail-form';
import { UseMailFormDir } from '@/core/forms/mail/etc/directives/use_mail_form';

@Component({
  selector: 'app-auth-req-mail-conf-mail',
  imports: [CsrWithTitle, AuthMailForm],
  templateUrl: './auth-req-mail-conf-mail.html',
  styleUrl: './auth-req-mail-conf-mail.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthReqMailConfMail extends UseMailFormDir {
  public readonly strategy: (data: MailFormT) => Observable<unknown> = (data: MailFormT) =>
    this.requireMailAPi.confMail(data).pipe(
      tap((_: ResApiT<void>) => {
        this.useNoticeKit.pushMailNotice('to confirm your account');
      })
    );
}
