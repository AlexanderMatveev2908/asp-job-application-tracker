import { AuthFormShape } from '@/features/auth/components/form_shape/auth-form-shape';
import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MailFormMng, MailFormT } from '../../paperwork/etc/mail';
import { MailFormUiFkt } from '../../ui_fkt/form_fields/1.mail';
import { TxtFieldT } from '@/common/types/forms';
import { UseKitFormAbsSvc } from '@/core/hooks/kits/kit_form/0.use_kit_form';
import { FormFieldTxt } from '@/common/components/forms/form_field_txt/form-field-txt';
import { Observable } from 'rxjs';
import { ApiTrackerSvc } from '@/core/store/api/etc/tracker';

@Component({
  selector: 'app-auth-mail-form',
  imports: [AuthFormShape, FormFieldTxt],
  templateUrl: './auth-mail-form.html',
  styleUrl: './auth-mail-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ApiTrackerSvc],
})
export class AuthMailForm extends UseKitFormAbsSvc {
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
