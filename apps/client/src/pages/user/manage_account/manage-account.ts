import { UseRouteMngSvc } from '@/core/hooks/use_route_mng';
import { TokenT } from '@/features/cbcHmac/etc/types';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CsrWithTitle } from '@/common/components/hoc/page/csr_with_title/csr-with-title';
import { Swapper } from '@/common/components/swap/swapper/swapper';
import { UseSwapSvc } from '@/core/hooks/use_swap/use_swap';

@Component({
  selector: 'app-manage-account',
  imports: [CsrWithTitle, Swapper],
  templateUrl: './manage-account.html',
  styleUrl: './manage-account.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UseRouteMngSvc],
})
export class ManageAccount extends UseSwapSvc implements OnInit {
  private readonly useRouteMng: UseRouteMngSvc = inject(UseRouteMngSvc);

  ngOnInit(): void {
    this.useRouteMng.pushOutIfNotTokenType('/user/manage-account', TokenT.MANAGE_ACC, {
      pushTo: '/user/access-manage-account',
      from: 'ok',
    });
  }
}
