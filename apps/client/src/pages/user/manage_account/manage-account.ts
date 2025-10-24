import { UseRouteMngSvc } from '@/core/hooks/use_route_mng';
import { TokenT } from '@/features/cbcHmac/etc/types';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CsrWithTitle } from '@/common/components/hoc/page/csr_with_title/csr-with-title';
import { Swapper } from '@/common/components/swap/swapper/swapper';
import { UseSwapSvc } from '@/core/hooks/use_swap/use_swap';
import { UserWrapSwap } from './components/user_wrap_swap/user-wrap-swap';
import { ChangeMailForm } from './swaps/change_mail_form/change-mail-form';
import { ChangePwdForm } from './swaps/change_pwd_form/change-pwd-form';
import { Setup2fa } from './swaps/setup_2fa/setup-2fa';
import { DeleteAccount } from './swaps/delete_account/delete-account';

@Component({
  selector: 'app-manage-account',
  imports: [
    CsrWithTitle,
    Swapper,
    UserWrapSwap,
    ChangeMailForm,
    ChangePwdForm,
    Setup2fa,
    DeleteAccount,
  ],
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
