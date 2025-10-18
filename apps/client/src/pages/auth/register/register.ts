import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CsrWithTitle } from '@/common/components/hoc/page/csr_with_title/csr-with-title';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CheckFieldT, TxtFieldT } from '@/common/types/forms';
import { RegisterFormFields } from '@/features/auth/register/ui_factory/form_fields';
import { FormFieldTxt } from '@/common/components/forms/form_field_txt/form-field-txt';
import { BtnShadow } from '@/common/components/btns/btn_shadow/btn-shadow';
import { Log } from '@/core/lib/log';
import { registerSchema } from '@/features/auth/register/paperwork/schema';
import { BtnStatePropsT, SpanEventPropsT } from '@/common/types/etc';
import { ZodCheck } from '@/core/paperwork/zod_check';

@Component({
  selector: 'app-register',
  imports: [CsrWithTitle, ReactiveFormsModule, FormFieldTxt, BtnShadow],
  templateUrl: './register.html',
  styleUrl: './register.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Register {
  public readonly form: FormGroup = new FormGroup(
    {
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      confirmPassword: new FormControl(''),
    },
    {
      validators: ZodCheck.checkZ(registerSchema),
    }
  );

  public readonly firstSwapFields: TxtFieldT[] = RegisterFormFields.firstSwap;
  public readonly pairPwdFields: TxtFieldT[] = RegisterFormFields.pwdFields;
  public readonly terms: CheckFieldT = RegisterFormFields.termsField;

  public readonly spanProps: SpanEventPropsT = {
    eventT: 'INFO',
    label: 'Submit',
    Svg: null,
  };
  public readonly btnProps: BtnStatePropsT = {
    isDisabled: false,
    isPending: false,
  };

  public getCtrl(f: TxtFieldT): FormControl {
    return this.form.get(f.name) as FormControl;
  }

  public onSubmit(): void {
    if (this.form.valid) Log.logTtl('form', this.form.value);
    else {
      ZodCheck.onSubmitFailed(this.form);

      Log.logTtl('err', this.form.errors);
    }
  }
}
