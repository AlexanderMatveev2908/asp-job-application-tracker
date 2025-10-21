import { Directive, input, InputSignal } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UseTestIdDir } from './use_test_id';

@Directive()
export abstract class UseFormShapeDir extends UseTestIdDir {
  public readonly fromGroup: InputSignal<FormGroup> = input.required();
  public readonly onSubmit: InputSignal<() => void> = input.required();
  public readonly isPending: InputSignal<boolean> = input.required();
}
