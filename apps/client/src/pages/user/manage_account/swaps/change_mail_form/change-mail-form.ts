import { ChangeDetectionStrategy, Component, computed, inject, Signal } from '@angular/core';
import { UserMailForm } from '@/core/forms/user_mail/user-mail-form';
import { Observable, of } from 'rxjs';
import { UseKitStrategyDir } from '@/core/directives/forms/kits/0.use_kit_strategy';
import { UseIDsDir } from '@/core/directives/use_ids';
import { UserSlice } from '@/features/user/slice';
import { FormGroup } from '@angular/forms';
import { ChangeMailFormMng } from './etc/paperwork/change_mail_form_mng';

@Component({
  selector: 'app-change-mail-form',
  imports: [UserMailForm, UseKitStrategyDir, UseIDsDir],
  templateUrl: './change-mail-form.html',
  styleUrl: './change-mail-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangeMailForm {
  private readonly userSlice: UserSlice = inject(UserSlice);

  public readonly form: Signal<FormGroup> = computed(() =>
    ChangeMailFormMng.form(this.userSlice.user()?.email ?? null)
  );

  public readonly strategy: (data: unknown) => Observable<unknown> = (data: unknown) => {
    console.log(data);

    return of(data);
  };
}
