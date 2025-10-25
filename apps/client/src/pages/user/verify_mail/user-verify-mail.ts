import { CsrWithTitle } from '@/common/components/hoc/page/csr_with_title/csr-with-title';
import { UserMailForm } from '@/core/forms/user_mail/user-mail-form';
import { UseKitMailFormHk } from '@/core/hooks/kits/kit_form/-1.use_kit_mail';
import { MailFormMng, MailFormT } from '@/core/paperwork/etc/mail';
import { ResApiT } from '@/core/store/api/etc/types';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { UseKitStrategyDir } from '@/core/directives/forms/kits/0.use_kit_strategy';
import { UseIDsDir } from '@/core/directives/use_ids';
import { FormGroup } from '@angular/forms';
import { VerifyMailFormUserMng } from './etc/paperwork/verify_mail_user_form_mng';
import { UserSlice } from '@/features/user/slice';
import { Nullable } from '@/common/types/etc';

@Component({
  selector: 'app-user-verify-mail',
  imports: [CsrWithTitle, UserMailForm, UseKitStrategyDir, UseIDsDir],
  templateUrl: './user-verify-mail.html',
  styleUrl: './user-verify-mail.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserVerifyMail extends UseKitMailFormHk {
  private readonly userSlice: UserSlice = inject(UserSlice);

  public readonly form: () => FormGroup = () => {
    const existing: Nullable<string> = this.userSlice.user()?.email ?? null;
    return existing ? VerifyMailFormUserMng.form(existing) : MailFormMng.form();
  };

  public readonly strategy: (data: unknown) => Observable<unknown> = (data: unknown) =>
    this.requireMailAPi.confMailLogged(data as MailFormT).pipe(
      tap((_: ResApiT<void>) => {
        this.useSideApiKit.pushMailNotice('to confirm your account');
      })
    );
}
