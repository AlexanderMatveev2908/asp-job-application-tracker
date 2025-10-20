import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  EffectRef,
  inject,
  Signal,
} from '@angular/core';
import { CsrWithTitle } from '@/common/components/hoc/page/csr_with_title/csr-with-title';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CheckFieldT, TxtFieldT } from '@/common/types/forms';
import { RegisterFormUiFkt } from '@/features/auth/register/ui_fkt/form_fields';
import { FormFieldTxt } from '@/common/components/forms/form_field_txt/form-field-txt';
import { BtnShadow } from '@/common/components/btns/btn_shadow/btn-shadow';
import { Log } from '@/core/lib/dev/log';
import { BtnStatePropsT, Nullable } from '@/common/types/etc';
import { ZodCheck } from '@/core/paperwork/zod_check';
import { Swapper } from '@/common/components/swap/swapper/swapper';
import { PairPwd } from '@/common/components/hoc/pair_pwd/pair-pwd';
import { RegisterFormMng } from '@/features/auth/register/paperwork/form_mng';
import { SpanEventPropsT } from '@/common/components/els/span/etc/types';
import { UseSwapDir } from '@/core/directives/use_swap/use_swap';
import { PortalModule } from '@angular/cdk/portal';
import { LibEtc } from '@/core/lib/etc';
import { ShapeCheck } from '@/core/lib/data_structure/shape_check';
import { FormFieldBoxSm } from '@/common/components/forms/form_field_box_sm/form-field-box-sm';
import { UseNavSvc } from '@/core/hooks/use_nav';
import { NoticeSlice } from '@/features/notice/slice';
import { AuthApiSvc } from '@/features/auth/api';
import { ResApiT } from '@/core/store/api/etc/types';
import { RegisterResT } from '@/features/auth/etc/types';
import { from, switchMap, tap } from 'rxjs';
import { ApiTrackerSvc } from '@/core/store/api/etc/tracker';

@Component({
  selector: 'app-register',
  imports: [
    CsrWithTitle,
    ReactiveFormsModule,
    FormFieldTxt,
    BtnShadow,
    Swapper,
    PairPwd,
    PortalModule,
    FormFieldBoxSm,
  ],
  templateUrl: './register.html',
  styleUrl: './register.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ApiTrackerSvc],
})
export class Register extends UseSwapDir {
  // ? svc
  private readonly authApi: AuthApiSvc = inject(AuthApiSvc);
  private readonly useNav: UseNavSvc = inject(UseNavSvc);
  private readonly noticeSlice: NoticeSlice = inject(NoticeSlice);
  private readonly tracker: ApiTrackerSvc = inject(ApiTrackerSvc);

  // ? form related
  public readonly form: FormGroup = RegisterFormMng.form;

  // ? derived
  public getOpacity(idx: number): Signal<number> {
    return computed(() => (idx === this.swapState().swap ? 1 : 0));
  }

  // ? static fields
  public readonly firstSwapFields: TxtFieldT[] = RegisterFormUiFkt.firstSwap;
  public readonly terms: CheckFieldT = RegisterFormUiFkt.termsField;

  // ? btn props
  public readonly spanProps: SpanEventPropsT = {
    eventT: 'INFO',
    label: 'Submit',
    Svg: null,
  };
  public readonly btnProps: Signal<BtnStatePropsT> = computed(() => ({
    isDisabled: false,
    isPending: this.tracker.isPending(),
  }));

  // ? helper dynamic app-field-txt props
  public readonly getCtrl: (name: string) => FormControl = (name: string) =>
    this.form.get(name) as FormControl;

  // ? listeners
  private readonly focusOnSwap: EffectRef = effect(() => this.focusWhen('firstName', 'password'));

  public async onSubmit(): Promise<void> {
    if (this.form.valid) {
      this.tracker
        .main(
          this.authApi.register(this.form.value).pipe(
            tap((res: ResApiT<RegisterResT>) => {
              Log.logTtl('tap', res);

              this.noticeSlice.mailNotice = {
                eventT: 'OK',
                msg: 'to confirm your account',
                status: 201,
              };
            }),
            switchMap(() => from(this.useNav.push('/notice')))
          )
        )
        .subscribe();
    } else
      ZodCheck.onSubmitFailedInSwap(this.form, (first: string) => {
        const target: Nullable<number> = LibEtc.idxIn(first, RegisterFormMng.fieldsBySwap);

        if (!ShapeCheck.isNone(target)) this.setSwapOnErr(target!);
      });
  }
}
