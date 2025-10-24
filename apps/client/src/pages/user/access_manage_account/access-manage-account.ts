import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CsrWithTitle } from '@/common/components/hoc/page/csr_with_title/csr-with-title';
import { FormPwd } from '@/core/forms/pwd/form-pwd';
import { Observable, of } from 'rxjs';
import { PwdFormT } from '@/core/paperwork/etc/pwd';

@Component({
  selector: 'app-access-manage-account',
  imports: [CsrWithTitle, FormPwd],
  templateUrl: './access-manage-account.html',
  styleUrl: './access-manage-account.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccessManageAccount {
  public readonly strategy: (data: PwdFormT) => Observable<unknown> = (data: PwdFormT) => {
    console.log(data);

    return of(data);
  };
}
