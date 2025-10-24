import { ChangeDetectionStrategy, Component, effect, EffectRef, inject } from '@angular/core';
import { CsrWithTitle } from '@/common/components/hoc/page/csr_with_title/csr-with-title';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CheckFieldT, TxtFieldT } from '@/common/types/forms';
import { RegisterFormUiFkt } from '@/features/auth/pages/register/ui_fkt';
import { FormFieldTxt } from '@/common/components/forms/form_field_txt/form-field-txt';
import { Swapper } from '@/common/components/swap/swapper/swapper';
import { PairPwd } from '@/common/components/hoc/pair_pwd/pair-pwd';
import { RegisterFormMng, RegisterFormT } from '@/features/auth/pages/register/paperwork/form_mng';
import { PortalModule } from '@angular/cdk/portal';
import { FormFieldBoxSm } from '@/common/components/forms/form_field_box_sm/form-field-box-sm';
import { ResApiT } from '@/core/store/api/etc/types';
import { JwtResT } from '@/features/auth/etc/types';
import { tap } from 'rxjs';
import { AuthFormShape } from '@/features/auth/components/form_shape/auth-form-shape';
import { UseAuthKitSvc } from '@/features/auth/etc/use_auth_kit';
import { ApiTrackerSvc } from '@/core/store/api/etc/tracker';
import { UseKitSwapFormSvc } from '@/core/hooks/kits/kit_form/1.use_kit_swap_form';
import { UseSwapSvc } from '@/core/hooks/use_swap/use_swap';

@Component({
  selector: 'app-register',
  imports: [
    CsrWithTitle,
    ReactiveFormsModule,
    FormFieldTxt,
    Swapper,
    PairPwd,
    PortalModule,
    FormFieldBoxSm,
    AuthFormShape,
  ],
  templateUrl: './register.html',
  styleUrl: './register.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ApiTrackerSvc, UseSwapSvc],
})
export class Register extends UseKitSwapFormSvc {
  // ? svc
  private readonly useAuthKit: UseAuthKitSvc = inject(UseAuthKitSvc);

  // ? form related
  public readonly form: FormGroup = RegisterFormMng.form;

  // ? static fields
  public readonly firstSwapFields: TxtFieldT[] = RegisterFormUiFkt.firstSwap;
  public readonly terms: CheckFieldT = RegisterFormUiFkt.termsField;

  // ? listeners
  private readonly focusOnSwap: EffectRef = effect(() =>
    this.useSwap.focusWhen('firstName', 'password')
  );

  public onSubmit: () => Promise<void> = async () => {
    this.submitSwapForm({
      fields: RegisterFormMng.fieldsBySwap,
      cb: (data: unknown) =>
        this.useAuthKit.authApi.register(data as RegisterFormT).pipe(
          tap((res: ResApiT<JwtResT>) => {
            this.useAuthKit.authSlice.login(res.accessToken, { startTmr: true });

            this.useNoticeKit.pushMailNotice('to confirm your account');
          })
        ),
    });
  };
}
