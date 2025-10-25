import { FormFieldTxt } from '@/common/components/forms/form_field_txt/form-field-txt';
import { TxtFieldT } from '@/common/types/forms';
import { MailFormT } from '@/core/paperwork/etc/mail';
import { UseApiTrackerHk } from '@/core/store/api/etc/hooks/use_tracker';
import { MailFormUiFkt } from '@/core/ui_fkt/form_fields/1.mail';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormShape } from '@/common/components/forms/form_shape/form-shape';
import { NgClass } from '@angular/common';
import { UseKitStrategyDir } from '@/core/directives/forms/kits/0.use_kit_strategy';
import { UseFormShapeDir } from '@/core/directives/forms/use_form_shape';
import { UseIDsDir } from '@/core/directives/use_ids';
import { UseFormFieldDir } from '@/core/directives/forms/form_field/0.use_form_field';
import { UseKitDynamicFormDir } from '@/core/directives/forms/kits/0.use_kit_dynamic_form';

@Component({
  selector: 'app-user-mail-form',
  imports: [
    ReactiveFormsModule,
    FormFieldTxt,
    FormShape,
    NgClass,
    UseFormShapeDir,
    UseIDsDir,
    UseFormFieldDir,
  ],
  templateUrl: './user-mail-form.html',
  styleUrl: './user-mail-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UseApiTrackerHk],
})
export class UserMailForm extends UseKitDynamicFormDir {
  // ? directives
  public readonly useKitStrategy: UseKitStrategyDir = inject(UseKitStrategyDir);
  public readonly useIDsDir: UseIDsDir = inject(UseIDsDir);

  // ? static assets
  public readonly mailField: TxtFieldT = MailFormUiFkt.mailField();
  public readonly ctrl: FormControl = this.getCtrl('email');

  public readonly onSubmit: () => void = () => {
    this.submitForm((data: unknown) => this.useKitStrategy.strategy()(data as MailFormT));
  };
}
