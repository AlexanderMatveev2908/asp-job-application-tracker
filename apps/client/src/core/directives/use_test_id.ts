import { Nullable } from '@/common/types/etc';
import { Directive, input, InputSignal, Signal, computed } from '@angular/core';
import { Prs } from '../lib/data_structure/prs';

@Directive()
export abstract class UseTestIdDir {
  public readonly testId: InputSignal<Nullable<string>> = input<Nullable<string>>(null);

  public readonly testIdFormatted: Signal<string | null> = computed(() =>
    Prs.toSnake(this.testId() ?? '')
  );
}
