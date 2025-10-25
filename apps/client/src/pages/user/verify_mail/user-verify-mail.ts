import { CsrWithTitle } from '@/common/components/hoc/page/csr_with_title/csr-with-title';
import { UserMailForm } from '@/core/forms/user_mail/user-mail-form';
import { UseKitMailFormSvc } from '@/core/hooks/kits/kit_form/-1.use_kit_mail';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-user-verify-mail',
  imports: [CsrWithTitle, UserMailForm],
  templateUrl: './user-verify-mail.html',
  styleUrl: './user-verify-mail.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserVerifyMail extends UseKitMailFormSvc {
  public readonly strategy: (data: unknown) => Observable<unknown> = (data: unknown) => {
    console.log(data);

    return of(true);
  };
}
