import { ChangeDetectionStrategy, Component, effect, EffectRef, inject } from '@angular/core';
import { CsrWithTitle } from '@/common/components/hoc/page/csr_with_title/csr-with-title';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CheckFieldT, TxtFieldT } from '@/common/types/forms';
import { RegisterFormUiFkt } from '@/features/auth/pages/register/ui_fkt';
import { FormFieldTxt } from '@/common/components/forms/form_field_txt/form-field-txt';
import { Swapper } from '@/common/components/swap/swapper/swapper';
import { PairPwd } from '@/common/components/hoc/pair_pwd/pair-pwd';
import { RegisterFormMng, RegisterFormT } from '@/features/auth/pages/register/paperwork/form_mng';
import { UseSwapDir } from '@/core/directives/use_swap/use_swap';
import { PortalModule } from '@angular/cdk/portal';
import { FormFieldBoxSm } from '@/common/components/forms/form_field_box_sm/form-field-box-sm';
import { NoticeSlice } from '@/features/notice/slice';
import { ResApiT } from '@/core/store/api/etc/types';
import { JwtResT } from '@/features/auth/etc/types';
import { from, switchMap, tap } from 'rxjs';
import { AuthFormShape } from '@/features/auth/components/form_shape/auth-form-shape';
import { UseAuthKitSvc } from '@/features/auth/etc/use_auth_kit';

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
})
export class Register extends UseSwapDir {
  // ? svc
  private readonly useAuthKit: UseAuthKitSvc = inject(UseAuthKitSvc);
  private readonly noticeSlice: NoticeSlice = inject(NoticeSlice);

  // ? form related
  public readonly form: FormGroup = RegisterFormMng.form;

  // ? static fields
  public readonly firstSwapFields: TxtFieldT[] = RegisterFormUiFkt.firstSwap;
  public readonly terms: CheckFieldT = RegisterFormUiFkt.termsField;

  // ? listeners
  private readonly focusOnSwap: EffectRef = effect(() => this.focusWhen('firstName', 'password'));

  public onSubmit: () => Promise<void> = async () => {
    this.submitSwapForm((data: unknown) => {
      this.track(
        this.useAuthKit.authApi.register(data as RegisterFormT).pipe(
          tap((res: ResApiT<JwtResT>) => {
            this.useAuthKit.authSlice.login(res.accessToken, true);

            this.noticeSlice.mailNotice = {
              eventT: 'OK',
              msg: 'to confirm your account',
              status: 201,
            };
          }),
          switchMap(() => from(this.useNav.replace('/notice', { from: 'register' })))
        )
      ).subscribe();
      // | manage error swapping & waiting animation and focusing first issue
    }, RegisterFormMng.fieldsBySwap);
  };
}
