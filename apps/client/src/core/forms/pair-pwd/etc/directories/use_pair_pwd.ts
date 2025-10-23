import { Directive } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PairPwdFormMng } from '../paperwork/form_mng';
import { UseKitFormSvc } from '@/core/hooks/kits/kit_form/0.use_kit_form';

@Directive()
export abstract class UsePairPwfFormDir extends UseKitFormSvc {
  public readonly form: FormGroup = PairPwdFormMng.form();
}
