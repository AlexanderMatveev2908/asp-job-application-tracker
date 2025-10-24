import { BtnShadow } from '@/common/components/btns/btn_shadow/btn-shadow';
import { FormFieldTxt } from '@/common/components/forms/form_field_txt/form-field-txt';
import { TxtFieldT } from '@/common/types/forms';
import { UseKitFormSvc } from '@/core/hooks/kits/kit_form/0.use_kit_form';
import { MailFormMng } from '@/core/paperwork/etc/mail';
import { ApiTrackerSvc } from '@/core/store/api/etc/tracker';
import { MailFormUiFkt } from '@/core/ui_fkt/form_fields/1.mail';
import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-user-mail-form',
  imports: [ReactiveFormsModule, FormFieldTxt, BtnShadow],
  templateUrl: './user-mail-form.html',
  styleUrl: './user-mail-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ApiTrackerSvc],
})
export class UserMailForm extends UseKitFormSvc {
  // ? props
  public readonly testId: InputSignal<string> = input.required();

  public readonly form: FormGroup = MailFormMng.form();
  public readonly mailField: TxtFieldT = MailFormUiFkt.mailField();
  public readonly ctrl: FormControl = this.getCtrl('email');

  public readonly onSubmit: () => void = () => {
    this.submitForm((_: unknown) => EMPTY);
  };
}
