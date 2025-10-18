import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  InputSignal,
  Signal,
} from '@angular/core';
import { FormFieldTxt } from '../../forms/form_field_txt/form-field-txt';
import { FormFieldsCls } from '@/core/ui_factory/form_fields';
import { PwdMeta } from '@/core/ui_factory/pwd';
import { PairPwdStateT, TxtFieldT, TxtSvgFieldT } from '@/common/types/forms';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-pair-pwd',
  imports: [FormFieldTxt],
  templateUrl: './pair-pwd.html',
  styleUrl: './pair-pwd.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PairPwd {
  public readonly pairPwdState: InputSignal<PairPwdStateT> = input.required();
  public readonly setPairPwdState: InputSignal<
    (cb: (prev: PairPwdStateT) => PairPwdStateT) => void
  > = input.required();
  public readonly getCtrl: InputSignal<(key: TxtFieldT) => FormControl<unknown>> = input.required();

  public readonly pwdField: Signal<TxtSvgFieldT> = computed(() => ({
    ...FormFieldsCls.txtFieldOf({ name: 'password' }),
    ...PwdMeta.byBool(this.pairPwdState().isPwdTypePwd),
  }));
  public readonly confPwdField: Signal<TxtSvgFieldT> = computed(() => ({
    ...FormFieldsCls.txtFieldOf({ name: 'confirmPassword' }),
    ...PwdMeta.byBool(this.pairPwdState().isConfirmPwdTypePwd),
  }));

  public toggleByKey(key: keyof PairPwdStateT): () => void {
    return () => {
      const other: keyof PairPwdStateT =
        key === 'isPwdTypePwd' ? 'isConfirmPwdTypePwd' : 'isPwdTypePwd';

      this.setPairPwdState()((prev: PairPwdStateT) => ({
        ...prev,
        [key]: !prev[key],
        [other]: true,
      }));
    };
  }
}
