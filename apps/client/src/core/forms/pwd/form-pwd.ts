import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';
import { FormFieldTxt } from '@/common/components/forms/form_field_txt/form-field-txt';
import { TxtSvgFieldT } from '@/common/types/forms';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-pwd',
  imports: [FormFieldTxt],
  templateUrl: './form-pwd.html',
  styleUrl: './form-pwd.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormPwd {
  public readonly pwdField: InputSignal<TxtSvgFieldT> = input.required();
  public readonly ctrl: InputSignal<FormControl> = input.required();
  public readonly onTogglePwd: InputSignal<() => void> = input.required();
}
