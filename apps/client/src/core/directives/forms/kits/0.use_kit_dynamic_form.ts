import { UseKitFormRootHk } from '@/core/hooks/kits/kit_form/0.use_kit_form_root';
import { Directive, InputSignal } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Directive()
export abstract class UseKitDynamicFormDir extends UseKitFormRootHk {
  public abstract readonly form: InputSignal<FormGroup>;
  protected readonly getForm: () => FormGroup = () => this.form();
}
