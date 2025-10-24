import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  InputSignal,
  Signal,
} from '@angular/core';
import { FormFieldTxt } from '@/common/components/forms/form_field_txt/form-field-txt';
import { FormShape } from '@/common/components/forms/form_shape/form-shape';
import { Observable } from 'rxjs';
import { PwdFormMng, PwdFormT } from '../../paperwork/etc/pwd';
import { UseKitFormWithPwdSvc } from '@/core/hooks/kits/kit_form/1.use_kit_form_with_pwd';
import { FormControl, FormGroup } from '@angular/forms';
import { TxtSvgFieldT } from '@/common/types/forms';
import { PwdFieldsUiFkt } from '@/core/ui_fkt/form_fields/1.pwd';
import { ApiTrackerSvc } from '@/core/store/api/etc/tracker';

@Component({
  selector: 'app-form-pwd',
  imports: [FormFieldTxt, FormShape],
  templateUrl: './form-pwd.html',
  styleUrl: './form-pwd.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ApiTrackerSvc],
})
export class FormPwd extends UseKitFormWithPwdSvc {
  // ? props
  public readonly strategy: InputSignal<(data: PwdFormT) => Observable<unknown>> = input.required();
  public readonly testId: InputSignal<string> = input.required();

  // ? not required by parent
  public readonly form: FormGroup = PwdFormMng.form();
  public readonly pwdField: Signal<TxtSvgFieldT> = computed(() =>
    PwdFieldsUiFkt.fieldByBool('password', this.isPwdTypePwd())
  );
  public ctrl: FormControl = this.getCtrl('password');

  // ? props form-shape combined with personal props
  public readonly onSubmit: () => void = () => {
    this.submitForm((data: unknown) => this.strategy()(data as PwdFormT));
  };
}
