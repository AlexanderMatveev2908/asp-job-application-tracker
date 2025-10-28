import { Nullable } from '@/common/types/etc';
import { computed, Directive, input, InputSignal, Signal } from '@angular/core';
import { LibPrs } from '../lib/data_structure/prs';

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
    computed(() =>
      this.ifTestID(LibPrs.toSnake(this.testId() + (!idx ? '_prev_swap' : '_next_swap')))
    );
}
