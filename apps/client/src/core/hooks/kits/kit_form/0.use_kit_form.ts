import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UseKitFormRootHk } from './0.use_kit_form_root';

@Injectable()
export abstract class UseKitFormHk extends UseKitFormRootHk {
  public abstract readonly form: FormGroup;
  protected readonly getForm: () => FormGroup = () => this.form;
}
