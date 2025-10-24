import { UseKitFormWithPwdSvc } from '@/core/hooks/kits/kit_form/1.use_kit_form_with_pwd';
import { computed, Directive, Signal } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PwdFormMng } from '../paperwork/form_mng';
import { TxtSvgFieldT } from '@/common/types/forms';
import { PwdFieldsUiFkt } from '@/core/ui_fkt/form_fields/1.pwd';

@Directive()
export abstract class UsePwdFormDir extends UseKitFormWithPwdSvc {
  public readonly form: FormGroup = PwdFormMng.form();
  public readonly pwdField: Signal<TxtSvgFieldT> = computed(() =>
    PwdFieldsUiFkt.fieldByBool('password', this.isPwdTypePwd())
  );
  public ctrl: FormControl = this.getCtrl('password');
}
