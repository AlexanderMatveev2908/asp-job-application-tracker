import { Nullable } from '@/common/types/etc';
import { computed, Directive, input, InputSignal, Signal } from '@angular/core';
import { Form2faTestIdT } from '../forms/2fa/etc/directives/use_form_2fa';
import { CheckBoxFieldT } from '@/common/types/forms';

@Directive({
  selector: '[appUseIDsDir]',
})
export class UseIDsDir {
  public readonly testId: InputSignal<Nullable<string>> = input<Nullable<string>>(null);

  private ifTestID(arg: string): Nullable<string> {
    return !this.testId() ? null : arg;
  }

  public readonly submitVarID: Signal<Nullable<string>> = computed(() =>
    this.ifTestID(`${this.testId()}__submit`)
  );
  public readonly swapperVarID: Signal<Nullable<string>> = computed(() =>
    this.ifTestID(`${this.testId()}__swapper`)
  );

  public readonly swapBtnVarID: (idx: number) => Signal<Nullable<string>> = (idx: number) =>
    computed(() => this.ifTestID(this.testId() + (!idx ? '_prev_swap' : '_next_swap')));

  public readonly form2faVarID: (t: Form2faTestIdT) => Signal<Nullable<string>> = (
    t: Form2faTestIdT
  ) => computed(() => this.ifTestID(`${this.testId()}__swapper__${t}_form`));

  public readonly boxChoiceVarID: (f: CheckBoxFieldT) => Signal<Nullable<string>> = (
    f: CheckBoxFieldT
  ) => computed(() => `${f.name}__${f.val}`);
}
