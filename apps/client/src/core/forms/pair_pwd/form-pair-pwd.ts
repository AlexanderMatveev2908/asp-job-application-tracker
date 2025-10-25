import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';
import { PairPwd } from '@/common/components/hoc/pair_pwd/pair-pwd';
import { FormGroup } from '@angular/forms';
import { UseKitFormSvc } from '@/core/hooks/kits/kit_form/0.use_kit_form';
import { PairPwdFormMng, PairPwdFormT } from './etc/paperwork/form_mng';
import { FormShape } from '@/common/components/forms/form_shape/form-shape';
import { Observable } from 'rxjs';
import { ApiTrackerSvc } from '@/core/store/api/etc/tracker';
import { NgClass } from '@angular/common';
import { Nullable } from '@/common/types/etc';
import { ConfSwapT } from '@/core/hooks/use_swap/etc/types';

@Component({
  selector: 'app-form-pair-pwd',
  imports: [PairPwd, FormShape, NgClass],
  templateUrl: './form-pair-pwd.html',
  styleUrl: './form-pair-pwd.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ApiTrackerSvc],
})
export class FormPairPwd extends UseKitFormSvc {
  // ? props
  public readonly strategy: InputSignal<(data: PairPwdFormT) => Observable<unknown>> =
    input.required();
  public readonly testId: InputSignal<string> = input.required();
  public readonly useFullPage: InputSignal<boolean> = input.required();
  public readonly confSwap: InputSignal<Nullable<ConfSwapT>> = input<Nullable<ConfSwapT>>(null);

  // ? form group
  public readonly form: FormGroup = PairPwdFormMng.form();

  public readonly onSubmit: () => void = () => {
    this.submitForm((data: unknown) => this.strategy()(data as PairPwdFormT));
  };
}
