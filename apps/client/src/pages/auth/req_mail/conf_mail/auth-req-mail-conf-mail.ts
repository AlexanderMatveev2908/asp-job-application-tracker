import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CsrWithTitle } from '@/common/components/hoc/page/csr_with_title/csr-with-title';
import { AuthFormShape } from '@/features/auth/components/form_shape/auth-form-shape';
import { from, switchMap, tap } from 'rxjs';
import { ResApiT } from '@/core/store/api/etc/types';
import { FormMail } from '@/core/forms/mail/form-mail';
import { UseMailFormDir } from '@/core/forms/mail/directories/use_mail_form';
import { MailFormT } from '@/core/forms/mail/etc/paperwork/form_mng';

@Component({
  selector: 'app-auth-req-mail-conf-mail',
  imports: [CsrWithTitle, AuthFormShape, FormMail],
  templateUrl: './auth-req-mail-conf-mail.html',
  styleUrl: './auth-req-mail-conf-mail.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthReqMailConfMail extends UseMailFormDir {
  public readonly onSubmit: () => void = () => {
    this.submitForm((data: unknown) => {
      this.track(
        this.requireMailAPi.confMail(data as MailFormT).pipe(
          tap((_: ResApiT<void>) => {
            this.noticeSlice.mailNoticeMsg = 'to confirm your account';
          }),
          switchMap((_: ResApiT<void>) => from(this.useNav.replace('/notice', { from: 'ok' })))
        )
      ).subscribe();
    });
  };
}
