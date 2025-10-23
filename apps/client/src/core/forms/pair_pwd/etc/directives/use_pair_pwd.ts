import { Directive, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PairPwdFormMng } from '../paperwork/form_mng';
import { UseKitFormSvc } from '@/core/hooks/kits/kit_form/0.use_kit_form';
import { CbcHmacSlice } from '@/features/cbcHmac/slice';

@Directive()
export abstract class UsePairPwfFormDir extends UseKitFormSvc {
  protected readonly cbcHmacSlice: CbcHmacSlice = inject(CbcHmacSlice);
  public readonly form: FormGroup = PairPwdFormMng.form();
}
