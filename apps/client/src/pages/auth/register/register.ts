import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  EffectRef,
  Signal,
} from '@angular/core';
import { CsrWithTitle } from '@/common/components/hoc/page/csr_with_title/csr-with-title';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CheckFieldT, TxtFieldT } from '@/common/types/forms';
import { RegisterFormUiFkt } from '@/features/auth/register/ui_factory/form_fields';
import { FormFieldTxt } from '@/common/components/forms/form_field_txt/form-field-txt';
import { BtnShadow } from '@/common/components/btns/btn_shadow/btn-shadow';
import { Log } from '@/core/lib/log';
import { BtnStatePropsT } from '@/common/types/etc';
import { ZodCheck } from '@/core/paperwork/zod_check';
import { Swapper } from '@/common/components/swap/swapper/swapper';
import { PairPwd } from '@/common/components/hoc/pair_pwd/pair-pwd';
import { RegisterFormMng } from '@/features/auth/register/paperwork/form_mng';
import { SpanEventPropsT } from '@/common/components/els/span/etc/types';
import { WithSwap } from '@/core/directives/with_swap/with_swap';
import { PortalModule } from '@angular/cdk/portal';
import { LibEtc } from '@/core/lib/etc';
import { ShapeCheck } from '@/core/lib/data_structure/shape';
import { FormFieldBoxSm } from '@/common/components/forms/form_field_box_sm/form-field-box-sm';

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
})
export class Register extends WithSwap {
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
  public readonly btnProps: BtnStatePropsT = {
    isDisabled: false,
    isPending: false,
  };

  // ? helper dynamic app-field-txt props
  public readonly getCtrl: (name: string) => FormControl = (name: string) =>
    this.form.get(name) as FormControl;

  // ? listeners
  private readonly focusOnSwap: EffectRef = effect(() => this.focusWhen('firstName', 'password'));

  public onSubmit(): void {
    if (this.form.valid) Log.logTtl('form', this.form.value);
    else
      ZodCheck.onSubmitFailedInSwap(this.form, (first: string) => {
        const target: number | null = LibEtc.idxIn(first, RegisterFormMng.fieldsBySwap);

        if (!ShapeCheck.isNone(target)) this.setSwapOnErr(target!);
      });
  }
}
