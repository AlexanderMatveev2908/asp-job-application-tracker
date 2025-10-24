import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CsrWithTitle } from '@/common/components/hoc/page/csr_with_title/csr-with-title';
import { FormPwd } from '@/core/forms/pwd/form-pwd';
import { Observable, of } from 'rxjs';
import { PwdFormT } from '@/core/paperwork/etc/pwd';
import { UseRouteMngSvc } from '@/core/hooks/use_route_mng';

@Component({
  selector: 'app-access-manage-account',
  imports: [CsrWithTitle, FormPwd],
  templateUrl: './access-manage-account.html',
  styleUrl: './access-manage-account.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UseRouteMngSvc],
})
export class AccessManageAccount implements OnInit {
  private readonly useRouteMng: UseRouteMngSvc = inject(UseRouteMngSvc);

  public readonly strategy: (data: PwdFormT) => Observable<unknown> = (data: PwdFormT) => {
    console.log(data);

    return of(data);
  };

  ngOnInit(): void {
    this.useRouteMng.pushIfCbcHmacPresentOrNotType('/user/access-manage-account', { pushTo: '/' });
  }
}
