import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UserMailForm } from '@/core/forms/user_mail/user-mail-form';

@Component({
  selector: 'app-change-mail-form',
  imports: [UserMailForm],
  templateUrl: './change-mail-form.html',
  styleUrl: './change-mail-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangeMailForm {}
