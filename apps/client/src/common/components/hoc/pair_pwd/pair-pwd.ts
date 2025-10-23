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
import { PairPwdUiFkt } from '@/common/components/hoc/pair_pwd/etc/ui_fkt';
import { PairPwdStateT, TxtSvgFieldT } from '@/common/types/forms';
import { FormControl } from '@angular/forms';
import { PwdGenerator } from './pwd_generator/pwd-generator';
import { ConfSwapT } from '@/core/directives/use_swap/etc/types';
import { PwdChecker } from './pwd_checker/pwd-checker';
import { UseFocusSvc } from '@/core/hooks/listeners/use_focus';
import { Nullable } from '@/common/types/etc';

@Component({
  selector: 'app-pair-pwd',
  imports: [FormFieldTxt, PwdGenerator, PwdChecker],
  templateUrl: './pair-pwd.html',
  styleUrl: './pair-pwd.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PairPwd extends UseFocusSvc {
  // ? personal props
  public readonly getCtrl: InputSignal<(key: string) => FormControl<unknown>> = input.required();
  // ? component may be inside a swapper
  // ? but not necessarily so by default is always 0
  public readonly confSwap: InputSignal<Nullable<ConfSwapT>> = input<Nullable<ConfSwapT>>(null);
  public readonly focusOnMount: InputSignal<boolean> = input(false);

  // ? local state
  public readonly pairPwdState: WritableSignal<PairPwdStateT> = signal({
    isConfirmPwdTypePwd: true,
    isPwdTypePwd: true,
  });

  // ? ui fields
  public readonly pwdField: Signal<TxtSvgFieldT> = computed(() =>
    PairPwdUiFkt.pwdByBool(this.pairPwdState().isPwdTypePwd)
  );
  public readonly confPwdField: Signal<TxtSvgFieldT> = computed(() =>
    PairPwdUiFkt.confPwdByBool(this.pairPwdState().isConfirmPwdTypePwd)
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
