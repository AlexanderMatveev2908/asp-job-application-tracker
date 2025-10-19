import { CheckFieldT, TxtFieldT } from '@/common/types/forms';
import { FormFieldsUiFkt } from '@/core/ui_factory/form_fields';

export class RegisterFormUiFkt extends FormFieldsUiFkt {
  public static readonly firstSwap: TxtFieldT[] = [
    this.txtFieldOf({ name: 'firstName' }),
    this.txtFieldOf({ name: 'lastName' }),
    this.txtFieldOf({ name: 'email', type: 'email' }),
  ];

  public static readonly termsField: CheckFieldT = this.checkFieldOf({
    name: 'terms',
    type: 'radio',
    label: 'Terms & Conditions',
  });
}
