import { UseRouteMngSvc } from '@/core/hooks/use_route_mng';
import { TokenT } from '@/features/cbcHmac/etc/types';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-account',
  imports: [],
  templateUrl: './manage-account.html',
  styleUrl: './manage-account.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UseRouteMngSvc],
})
export class ManageAccount implements OnInit {
  private readonly useRouteMng: UseRouteMngSvc = inject(UseRouteMngSvc);

  ngOnInit(): void {
    this.useRouteMng.pushOutIfNotTokenType('/user/manage-account', TokenT.MANAGE_ACC, {
      pushTo: '/user/access-manage-account',
    });
  }
}
