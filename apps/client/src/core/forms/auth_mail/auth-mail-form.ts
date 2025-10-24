import { AuthFormShape } from '@/features/auth/components/form_shape/auth-form-shape';
import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MailFormMng, MailFormT } from '../mail/etc/paperwork/form_mng';
import { MailFormUiFkt } from '../mail/etc/ui_fkt';
import { TxtFieldT } from '@/common/types/forms';
import { UseKitFormSvc } from '@/core/hooks/kits/kit_form/0.use_kit_form';
import { FormFieldTxt } from '@/common/components/forms/form_field_txt/form-field-txt';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-auth-mail-form',
  imports: [AuthFormShape, FormFieldTxt],
  templateUrl: './auth-mail-form.html',
  styleUrl: './auth-mail-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthMailForm extends UseKitFormSvc {
  // ? not need by parent
  public readonly form: FormGroup = MailFormMng.form();
  public readonly mailField: TxtFieldT = MailFormUiFkt.mailField();
  public readonly ctrl: FormControl = this.getCtrl('email');

  // ? props
  public readonly strategy: InputSignal<(data: MailFormT) => Observable<unknown>> =
    input.required();
  public readonly testId: InputSignal<string> = input.required();

  // ? listeners got by mixing extended inherited methods with
  // ? personal props
  public readonly onSubmit: () => void = () => {
    this.submitForm((data: unknown) => this.strategy()(data as MailFormT));
  };
}
