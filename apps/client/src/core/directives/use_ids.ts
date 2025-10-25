import { Nullable } from '@/common/types/etc';
import { Directive, input, InputSignal } from '@angular/core';

@Directive({
  selector: '[appUseIDsDir]',
})
export class UseIDsDir {
  public readonly testId: InputSignal<Nullable<string>> = input<Nullable<string>>(null);
}
