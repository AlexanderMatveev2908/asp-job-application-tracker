import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UserMailForm } from '@/core/forms/user_mail/user-mail-form';
import { Observable, of } from 'rxjs';
import { UseKitStrategyDir } from '@/core/directives/forms/kits/0.use_kit_strategy';
import { UseIDsDir } from '@/core/directives/use_ids';

@Component({
  selector: 'app-change-mail-form',
  imports: [UserMailForm, UseKitStrategyDir, UseIDsDir],
  templateUrl: './change-mail-form.html',
  styleUrl: './change-mail-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangeMailForm {
  public readonly strategy: (data: unknown) => Observable<unknown> = (data: unknown) => {
    console.log(data);

    return of(data);
  };
}
