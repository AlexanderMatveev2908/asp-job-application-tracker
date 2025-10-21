import { CsrWithTitle } from '@/common/components/hoc/page/csr_with_title/csr-with-title';
import { TxtFieldT, TxtSvgFieldT } from '@/common/types/forms';
import { AuthFormShape } from '@/features/auth/components/form_shape/auth-form-shape';
import { LoginFormMng } from '@/features/auth/pages/login/paperwork/from_mng';
import { LoginFormUiFkt } from '@/features/auth/pages/login/ui_fkt';
import { ChangeDetectionStrategy, Component, computed, inject, Signal } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormFieldTxt } from '@/common/components/forms/form_field_txt/form-field-txt';
import { UseKitFormWithPwdSvc } from '@/core/hooks/form_kit/use_kit_form_with_pwd';
import { ApiTrackerSvc } from '@/core/store/api/etc/tracker';
import { UseAuthKitSvc } from '@/features/auth/etc/use_auth_kit';
import { from, switchMap, tap } from 'rxjs';
import { JwtResT } from '@/features/auth/etc/types';
import { ResApiT } from '@/core/store/api/etc/types';

@Component({
  selector: 'app-login',
  imports: [CsrWithTitle, AuthFormShape, FormFieldTxt],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ApiTrackerSvc],
})
export class Login extends UseKitFormWithPwdSvc {
  private readonly useAuthKit: UseAuthKitSvc = inject(UseAuthKitSvc);
  public readonly form: FormGroup = LoginFormMng.form;

  // ? assets
  public readonly mailField: TxtFieldT = LoginFormUiFkt.mailField;
  public readonly pwdField: Signal<TxtSvgFieldT> = computed(() =>
    LoginFormUiFkt.pwdByType(this.isPwdTypePwd())
  );

  // ? listeners
  public readonly onSubmit: () => Promise<void> = async () => {
    if (!this.form.valid) {
      LoginFormMng.onSubmitFailed(this.form);
      return;
    }

    this.tracker
      .main(
        this.useAuthKit.authApi.login(this.form.value).pipe(
          tap((res: ResApiT<JwtResT>) => {
            this.useAuthKit.authSlice.login(res.accessToken);
          }),
          switchMap(() => from(this.useNav.replace('/')))
        )
      )
      .subscribe();
  };
}
