import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CsrWithTitle } from '@/common/components/hoc/page/csr_with_title/csr-with-title';
import { UsePwdFormDir } from '@/core/forms/pwd/etc/directives/use_pwd_form';
import { FormPwd } from '@/core/forms/pwd/form-pwd';
import { of } from 'rxjs';
import { FormShape } from '@/common/components/forms/form_shape/form-shape';

@Component({
  selector: 'app-access-manage-account',
  imports: [CsrWithTitle, FormPwd, FormShape],
  templateUrl: './access-manage-account.html',
  styleUrl: './access-manage-account.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccessManageAccount extends UsePwdFormDir {
  public readonly onSubmit: () => void = () => {
    this.submitForm((data: unknown) => {
      console.log(data);

      return of(data);
    });
  };
}
