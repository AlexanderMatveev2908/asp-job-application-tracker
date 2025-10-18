import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  InputSignal,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { FormFieldTxt } from '../../forms/form_field_txt/form-field-txt';
import { PwdFkt } from '@/core/ui_factory/pwd';
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
  public readonly pairPwdState: WritableSignal<PairPwdStateT> = signal({
    isConfirmPwdTypePwd: true,
    isPwdTypePwd: true,
  });
  public readonly getCtrl: InputSignal<(key: TxtFieldT) => FormControl<unknown>> = input.required();

  public readonly pwdField: Signal<TxtSvgFieldT> = computed(() =>
    PwdFkt.pwdByBool(this.pairPwdState().isPwdTypePwd)
  );
  public readonly confPwdField: Signal<TxtSvgFieldT> = computed(() =>
    PwdFkt.confPwdByBool(this.pairPwdState().isConfirmPwdTypePwd)
  );

  public toggleByKey(key: keyof PairPwdStateT): () => void {
    return () => {
      const other: keyof PairPwdStateT =
        key === 'isPwdTypePwd' ? 'isConfirmPwdTypePwd' : 'isPwdTypePwd';

      this.pairPwdState.update((prev: PairPwdStateT) => ({
        ...prev,
        [key]: !prev[key],
        [other]: true,
      }));
    };
  }
}
