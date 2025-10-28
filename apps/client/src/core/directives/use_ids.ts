import { Nullable } from '@/common/types/etc';
import { computed, Directive, input, InputSignal, Signal } from '@angular/core';

@Directive({
  selector: '[appUseIDsDir]',
})
export class UseIDsDir {
  public readonly testId: InputSignal<Nullable<string>> = input<Nullable<string>>(null);

  public readonly submitVarID: Signal<Nullable<string>> = computed(() =>
    !this.testId() ? null : `${this.testId()}__submit`
  );
  public readonly swapperVarID: Signal<Nullable<string>> = computed(() =>
    !this.testId() ? null : `${this.testId()}__swapper`
  );
}
