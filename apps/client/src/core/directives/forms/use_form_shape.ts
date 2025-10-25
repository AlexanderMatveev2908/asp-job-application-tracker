import { Directive, input, InputSignal } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UseIDsDir } from '../use_ids';

@Directive({
  selector: '[appUseShapeDir]',
})
export class UseFormShapeDir extends UseIDsDir {
  public readonly fromGroup: InputSignal<FormGroup> = input.required();
  public readonly onSubmit: InputSignal<() => void> = input.required();
  public readonly isPending: InputSignal<boolean> = input.required();
}
