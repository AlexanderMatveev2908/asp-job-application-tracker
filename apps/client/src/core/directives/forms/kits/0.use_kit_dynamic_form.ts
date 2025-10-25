import { UseKitFormRootHk } from '@/core/hooks/kits/kit_form/0.use_kit_form_root';
import { Directive, input, InputSignal } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Directive()
export abstract class UseKitDynamicFormDir extends UseKitFormRootHk {
  public readonly form: InputSignal<FormGroup> = input.required();
  protected readonly getForm: () => FormGroup = () => this.form();
}
