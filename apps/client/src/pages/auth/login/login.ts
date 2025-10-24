import { CsrWithTitle } from '@/common/components/hoc/page/csr_with_title/csr-with-title';
import { TxtFieldT, TxtSvgFieldT } from '@/common/types/forms';
import { AuthFormShape } from '@/features/auth/components/form_shape/auth-form-shape';
import { LoginFormMng, LoginFormT } from '@/features/auth/pages/login/paperwork/from_mng';
import { LoginFormUiFkt } from '@/features/auth/pages/login/ui_fkt';
import { ChangeDetectionStrategy, Component, computed, inject, Signal } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormFieldTxt } from '@/common/components/forms/form_field_txt/form-field-txt';
import { UseAuthKitSvc } from '@/features/auth/etc/use_auth_kit';
import { from, switchMap, tap } from 'rxjs';
import { JwtResT } from '@/features/auth/etc/types';
import { ResApiT } from '@/core/store/api/etc/types';
import { UseKitFormWithPwdSvc } from '@/core/hooks/kits/kit_form/1.use_kit_form_with_pwd';
import { PwdFieldsUiFkt } from '@/core/ui_fkt/form_fields/1.pwd';
import { ApiTrackerSvc } from '@/core/store/api/etc/tracker';

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
    PwdFieldsUiFkt.fieldByBool('password', this.isPwdTypePwd())
  );

  // ? listeners
  public readonly onSubmit: () => void = () => {
    this.submitForm((data: unknown) =>
      this.useAuthKit.authApi.login(data as LoginFormT).pipe(
        tap((res: ResApiT<JwtResT>) => {
          this.useAuthKit.authSlice.login(res.accessToken, { startTmr: true });
        }),
        switchMap(() => from(this.useNoticeKit.useNav.replace('/')))
      )
    );
  };
}
