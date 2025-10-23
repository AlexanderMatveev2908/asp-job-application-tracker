import { CsrWithTitle } from '@/common/components/hoc/page/csr_with_title/csr-with-title';
import { UseMailFormDir } from '@/core/forms/mail/etc/directories/use_mail_form';
import { MailFormT } from '@/core/forms/mail/etc/paperwork/form_mng';
import { FormMail } from '@/core/forms/mail/form-mail';
import { ResApiT } from '@/core/store/api/etc/types';
import { AuthFormShape } from '@/features/auth/components/form_shape/auth-form-shape';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { from, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-auth-req-mail-recover-pwd',
  imports: [CsrWithTitle, AuthFormShape, FormMail],
  templateUrl: './auth-req-mail-recover-pwd.html',
  styleUrl: './auth-req-mail-recover-pwd.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthReqMailRecoverPwd extends UseMailFormDir {
  public onSubmit: () => void = () => {
    this.submitForm((data: unknown) => {
      this.track(
        this.requireMailAPi.recoverPwd(data as MailFormT).pipe(
          tap((_: ResApiT<void>) => {
            this.noticeSlice.mailNoticeMsg = 'to recover your password';
          }),
          switchMap((_: ResApiT<void>) => from(this.useNav.replace('/notice', { from: 'ok' })))
        )
      ).subscribe();
    });
  };
}
