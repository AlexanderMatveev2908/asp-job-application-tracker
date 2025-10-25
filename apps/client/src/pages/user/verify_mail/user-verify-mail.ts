import { CsrWithTitle } from '@/common/components/hoc/page/csr_with_title/csr-with-title';
import { UserMailForm } from '@/core/forms/user_mail/user-mail-form';
import { UseKitMailFormHk } from '@/core/hooks/kits/kit_form/-1.use_kit_mail';
import { MailFormT } from '@/core/paperwork/etc/mail';
import { ResApiT } from '@/core/store/api/etc/types';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { UseKitStrategyDir } from '@/core/directives/forms/kits/0.use_kit_strategy';

@Component({
  selector: 'app-user-verify-mail',
  imports: [CsrWithTitle, UserMailForm, UseKitStrategyDir],
  templateUrl: './user-verify-mail.html',
  styleUrl: './user-verify-mail.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserVerifyMail extends UseKitMailFormHk {
  public readonly strategy: (data: unknown) => Observable<unknown> = (data: unknown) =>
    this.requireMailAPi.confMailLogged(data as MailFormT).pipe(
      tap((_: ResApiT<void>) => {
        this.useNoticeKit.pushMailNotice('to confirm your account');
      })
    );
}
