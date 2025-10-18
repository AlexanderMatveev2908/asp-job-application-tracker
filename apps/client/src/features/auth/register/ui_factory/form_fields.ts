import { CheckFieldT, TxtFieldT } from '@/common/types/forms';
import { FormFieldsFkt } from '@/core/ui_factory/form_fields';

export class RegisterFormFkt {
  public static readonly firstSwap: TxtFieldT[] = [
    FormFieldsFkt.txtFieldOf({ name: 'firstName' }),
    FormFieldsFkt.txtFieldOf({ name: 'lastName' }),
    FormFieldsFkt.txtFieldOf({ name: 'email', type: 'email' }),
  ];

  public static readonly pwd: TxtFieldT = FormFieldsFkt.txtFieldOf({ name: 'password' });
  public static readonly confPwd: TxtFieldT = FormFieldsFkt.txtFieldOf({
    name: 'confirmPassword',
  });

  public static readonly termsField: CheckFieldT = FormFieldsFkt.checkFieldOf({
    name: 'terms',
    type: 'radio',
  });
}
