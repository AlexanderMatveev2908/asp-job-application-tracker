import { CheckFieldT, TxtFieldT } from '@/common/types/forms';
import { FormFieldsSvc } from '@/core/ui_factory/form_fields';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RegisterFormFieldsSvc {
  private readonly formFieldsSvc: FormFieldsSvc = inject(FormFieldsSvc);

  public readonly firstSwap: TxtFieldT[] = [
    this.formFieldsSvc.txtFieldOf({ name: 'firstName' }),
    this.formFieldsSvc.txtFieldOf({ name: 'lastName' }),
    this.formFieldsSvc.txtFieldOf({ name: 'email', type: 'email' }),
  ];

  public readonly pwdFields: TxtFieldT[] = [
    this.formFieldsSvc.txtFieldOf({ name: 'password', type: 'password' }),
    this.formFieldsSvc.txtFieldOf({ name: 'confirmPassword', type: 'password' }),
  ];

  public readonly termsField: CheckFieldT = this.formFieldsSvc.checkFieldOf({
    name: 'terms',
    type: 'radio',
  });
}
