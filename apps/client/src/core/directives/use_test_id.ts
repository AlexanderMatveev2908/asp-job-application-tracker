import { Nullable } from '@/common/types/etc';
import { Directive, input, InputSignal } from '@angular/core';

@Directive()
export abstract class UseTestIdDir {
  public readonly testId: InputSignal<Nullable<string>> = input<Nullable<string>>(null);
}
