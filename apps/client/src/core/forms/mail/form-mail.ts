import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';
import { TxtFieldT } from '@/common/types/forms';
import { FormFieldTxt } from '@/common/components/forms/form_field_txt/form-field-txt';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-mail',
  imports: [FormFieldTxt],
  templateUrl: './form-mail.html',
  styleUrl: './form-mail.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormMail {
  public readonly mailField: InputSignal<TxtFieldT> = input.required();
  public readonly ctrl: InputSignal<FormControl> = input.required();
}
