import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CsrWithTitle } from '@/common/components/hoc/page/csr_with_title/csr-with-title';
import { AuthFormShape } from '@/features/auth/components/form_shape/auth-form-shape';
import { TxtFieldT } from '@/common/types/forms';
import { ConfMailUiFkt } from '@/features/auth/pages/req_mail/conf_mail/ui_fkt';
import { FormGroup } from '@angular/forms';
import { ConfMailFormMng } from '@/features/auth/pages/req_mail/conf_mail/paperwork/form_mng';
import { Log } from '@/core/lib/dev/log';
import { UseKitFormSvc } from '@/core/hooks/kits/kit_form/0.use_kit_form';

@Component({
  selector: 'app-auth-req-mail-conf-mail',
  imports: [CsrWithTitle, AuthFormShape],
  templateUrl: './auth-req-mail-conf-mail.html',
  styleUrl: './auth-req-mail-conf-mail.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthReqMailConfMail extends UseKitFormSvc {
  public readonly form: FormGroup = ConfMailFormMng.form;
  public readonly mailField: TxtFieldT = ConfMailUiFkt.mailField;

  public readonly onSubmit: () => void = () => {
    if (!this.form.valid) {
      ConfMailFormMng.onSubmitFailed(this.form);
      return;
    }

    Log.log(this.form.value);
  };
}
