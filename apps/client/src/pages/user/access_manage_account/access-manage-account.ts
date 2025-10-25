import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CsrWithTitle } from '@/common/components/hoc/page/csr_with_title/csr-with-title';
import { FormPwd } from '@/core/forms/pwd/form-pwd';
import { Observable, tap } from 'rxjs';
import { PwdFormT } from '@/core/paperwork/etc/pwd';
import { UseRouteMngHk } from '@/core/hooks/use_route_mng';
import { UserApiSvc } from '@/features/user/api';
import { ResApiT } from '@/core/store/api/etc/types';
import { CbcHmacMandatoryT } from '@/features/cbcHmac/etc/types';
import { CbcHmacSlice } from '@/features/cbcHmac/slice';
import { UseNavSvc } from '@/core/services/use_nav/use_nav';

@Component({
  selector: 'app-access-manage-account',
  imports: [CsrWithTitle, FormPwd],
  templateUrl: './access-manage-account.html',
  styleUrl: './access-manage-account.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UseRouteMngHk],
})
export class AccessManageAccount implements OnInit {
  private readonly useRouteMng: UseRouteMngHk = inject(UseRouteMngHk);
  private readonly userApi: UserApiSvc = inject(UserApiSvc);
  private readonly cbcHmacSlice: CbcHmacSlice = inject(CbcHmacSlice);
  private readonly useNav: UseNavSvc = inject(UseNavSvc);

  public readonly strategy: (data: PwdFormT) => Observable<unknown> = (data: PwdFormT) =>
    this.userApi.getAccessAccount(data).pipe(
      tap((res: ResApiT<CbcHmacMandatoryT>) => {
        this.cbcHmacSlice.saveCbcHmac(res.cbcHmacToken, {
          startTmr: true,
        });

        void this.useNav.replace('/user/manage-account', { from: 'ok' });
      })
    );

  ngOnInit(): void {
    this.useRouteMng.pushIfCbcHmacPresentOrNotType('/user/access-manage-account', { pushTo: '/' });
  }
}
