import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UserMailForm } from '@/core/forms/user_mail/user-mail-form';
import { MailFormT } from '@/core/paperwork/etc/mail';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-change-mail-form',
  imports: [UserMailForm],
  templateUrl: './change-mail-form.html',
  styleUrl: './change-mail-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangeMailForm {
  public readonly strategy: (data: MailFormT) => Observable<unknown> = (data: MailFormT) => {
    console.log(data);

    return of(data);
  };
}
