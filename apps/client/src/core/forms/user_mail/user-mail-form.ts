import { FormFieldTxt } from '@/common/components/forms/form_field_txt/form-field-txt';
import { TxtFieldT } from '@/common/types/forms';
import { MailFormMng, MailFormT } from '@/core/paperwork/etc/mail';
import { ApiTrackerHk } from '@/core/store/api/etc/tracker';
import { MailFormUiFkt } from '@/core/ui_fkt/form_fields/1.mail';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormShape } from '@/common/components/forms/form_shape/form-shape';
import { UseKitFormStrategyDir } from '@/core/directives/use_kit_form_strategy';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-user-mail-form',
  imports: [ReactiveFormsModule, FormFieldTxt, FormShape, NgClass],
  templateUrl: './user-mail-form.html',
  styleUrl: './user-mail-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ApiTrackerHk],
})
export class UserMailForm extends UseKitFormStrategyDir {
  // ? static assets
  public readonly form: FormGroup = MailFormMng.form();
  public readonly mailField: TxtFieldT = MailFormUiFkt.mailField();
  public readonly ctrl: FormControl = this.getCtrl('email');

  public readonly onSubmit: () => void = () => {
    this.submitForm((data: unknown) => this.strategy()(data as MailFormT));
  };
}
