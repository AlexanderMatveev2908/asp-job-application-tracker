import { CheckFieldT, TxtFieldT } from '@/common/types/forms';
import { FormFieldsCls } from '@/core/ui_factory/form_fields';

export class RegisterFormFields {
  public static readonly firstSwap: TxtFieldT[] = [
    FormFieldsCls.txtFieldOf({ name: 'firstName' }),
    FormFieldsCls.txtFieldOf({ name: 'lastName' }),
    FormFieldsCls.txtFieldOf({ name: 'email', type: 'email' }),
  ];

  public static readonly pwdFields: TxtFieldT[] = [
    FormFieldsCls.txtFieldOf({ name: 'password', type: 'password' }),
    FormFieldsCls.txtFieldOf({ name: 'confirmPassword', type: 'password' }),
  ];

  public static readonly termsField: CheckFieldT = FormFieldsCls.checkFieldOf({
    name: 'terms',
    type: 'radio',
  });
}
