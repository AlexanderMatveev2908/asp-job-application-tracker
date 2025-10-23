import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CsrWithTitle } from '@/common/components/hoc/page/csr_with_title/csr-with-title';
import { AuthFormShape } from '@/features/auth/components/form_shape/auth-form-shape';
import { UsePairPwfFormDir } from '@/core/forms/pair-pwd/etc/directories/use_pair_pwd';
import { FormPairPwd } from '@/core/forms/pair-pwd/form-pair-pwd';

@Component({
  selector: 'app-recover-pwd',
  imports: [CsrWithTitle, AuthFormShape, FormPairPwd],
  templateUrl: './recover-pwd.html',
  styleUrl: './recover-pwd.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecoverPwd extends UsePairPwfFormDir {
  public readonly onSubmit: () => void = () => {
    this.submitForm((data: unknown) => {
      console.log(data);
    });
  };
}
