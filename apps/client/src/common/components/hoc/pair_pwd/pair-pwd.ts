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
import { PwdUiFkt } from '@/core/ui_factory/form_fields/etc/pwd';
import { PairPwdStateT, TxtFieldT, TxtSvgFieldT } from '@/common/types/forms';
import { FormControl } from '@angular/forms';
import { PwdGenerator } from './pwd_generator/pwd-generator';
import { ConfSwapT } from '@/core/directives/with_swap/etc/types';

@Component({
  selector: 'app-pair-pwd',
  imports: [FormFieldTxt, PwdGenerator],
  templateUrl: './pair-pwd.html',
  styleUrl: './pair-pwd.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PairPwd {
  // ? personal props
  public readonly getCtrl: InputSignal<(key: TxtFieldT) => FormControl<unknown>> = input.required();
  // ? component may be inside a swapper
  // ? but not necessarily so by default is always 0
  public readonly confSwap: InputSignal<ConfSwapT | null> = input<ConfSwapT | null>(null);

  // ? local state
  public readonly pairPwdState: WritableSignal<PairPwdStateT> = signal({
    isConfirmPwdTypePwd: true,
    isPwdTypePwd: true,
  });

  // ? ui fields
  public readonly pwdField: Signal<TxtSvgFieldT> = computed(() =>
    PwdUiFkt.pwdByBool(this.pairPwdState().isPwdTypePwd)
  );
  public readonly confPwdField: Signal<TxtSvgFieldT> = computed(() =>
    PwdUiFkt.confPwdByBool(this.pairPwdState().isConfirmPwdTypePwd)
  );

  // ? listeners
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
