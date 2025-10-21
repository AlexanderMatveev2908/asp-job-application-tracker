import { ChangeDetectionStrategy, Component, effect, EffectRef, inject } from '@angular/core';
import { CsrWithTitle } from '@/common/components/hoc/page/csr_with_title/csr-with-title';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CheckFieldT, TxtFieldT } from '@/common/types/forms';
import { RegisterFormUiFkt } from '@/features/auth/pages/register/ui_fkt';
import { FormFieldTxt } from '@/common/components/forms/form_field_txt/form-field-txt';
import { Nullable } from '@/common/types/etc';
import { Swapper } from '@/common/components/swap/swapper/swapper';
import { PairPwd } from '@/common/components/hoc/pair_pwd/pair-pwd';
import { RegisterFormMng } from '@/features/auth/pages/register/paperwork/form_mng';
import { UseSwapDir } from '@/core/directives/use_swap/use_swap';
import { PortalModule } from '@angular/cdk/portal';
import { LibEtc } from '@/core/lib/etc';
import { ShapeCheck } from '@/core/lib/data_structure/shape_check';
import { FormFieldBoxSm } from '@/common/components/forms/form_field_box_sm/form-field-box-sm';
import { NoticeSlice } from '@/features/notice/slice';
import { AuthApiSvc } from '@/features/auth/api';
import { ResApiT } from '@/core/store/api/etc/types';
import { RegisterResT } from '@/features/auth/etc/types';
import { from, switchMap, tap } from 'rxjs';
import { ApiTrackerSvc } from '@/core/store/api/etc/tracker';
import { AuthSlice } from '@/features/auth/slice';
import { AuthFormShape } from '@/features/auth/components/form_shape/auth-form-shape';

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
  providers: [ApiTrackerSvc],
})
export class Register extends UseSwapDir {
  // ? svc
  private readonly authSlice: AuthSlice = inject(AuthSlice);
  private readonly authApi: AuthApiSvc = inject(AuthApiSvc);
  private readonly noticeSlice: NoticeSlice = inject(NoticeSlice);

  // ? form related
  public readonly form: FormGroup = RegisterFormMng.form;

  // ? static fields
  public readonly firstSwapFields: TxtFieldT[] = RegisterFormUiFkt.firstSwap;
  public readonly terms: CheckFieldT = RegisterFormUiFkt.termsField;

  // ? listeners
  private readonly focusOnSwap: EffectRef = effect(() => this.focusWhen('firstName', 'password'));

  public onSubmit: () => Promise<void> = async () => {
    if (!this.form.valid) {
      RegisterFormMng.onSubmitFailedInSwap(this.form, (first: string) => {
        const target: Nullable<number> = LibEtc.idxIn(first, RegisterFormMng.fieldsBySwap);

        if (!ShapeCheck.isNone(target)) this.setSwapOnErr(target!);
      });

      return;
    }

    this.tracker
      .main(
        this.authApi.register(this.form.value).pipe(
          tap((res: ResApiT<RegisterResT>) => {
            this.authSlice.login(res.accessToken);

            this.noticeSlice.mailNotice = {
              eventT: 'OK',
              msg: 'to confirm your account',
              status: 201,
            };
          }),
          switchMap(() => from(this.useNav.replace('/notice', { from: 'register' })))
        )
      )
      .subscribe();
  };
}
