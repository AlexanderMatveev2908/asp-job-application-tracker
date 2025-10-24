import { FormFieldTxt } from '@/common/components/forms/form_field_txt/form-field-txt';
import { TxtFieldT } from '@/common/types/forms';
import { UseKitFormSvc } from '@/core/hooks/kits/kit_form/0.use_kit_form';
import { MailFormMng, MailFormT } from '@/core/paperwork/etc/mail';
import { ApiTrackerSvc } from '@/core/store/api/etc/tracker';
import { MailFormUiFkt } from '@/core/ui_fkt/form_fields/1.mail';
import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { FormShape } from '@/common/components/forms/form_shape/form-shape';

@Component({
  selector: 'app-user-mail-form',
  imports: [ReactiveFormsModule, FormFieldTxt, FormShape],
  templateUrl: './user-mail-form.html',
  styleUrl: './user-mail-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ApiTrackerSvc],
})
export class UserMailForm extends UseKitFormSvc {
  // ? props
  public readonly testId: InputSignal<string> = input.required();
  public readonly strategy: InputSignal<(data: MailFormT) => Observable<unknown>> =
    input.required();

  // ? static assets
  public readonly form: FormGroup = MailFormMng.form();
  public readonly mailField: TxtFieldT = MailFormUiFkt.mailField();
  public readonly ctrl: FormControl = this.getCtrl('email');

  public readonly onSubmit: () => void = () => {
    this.submitForm((data: unknown) => this.strategy()(data as MailFormT));
  };
}
