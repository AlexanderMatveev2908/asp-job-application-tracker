/* eslint-disable @typescript-eslint/prefer-readonly */
import { Nullable, TimerIdT } from '@/common/types/etc';
import { CbcHmacSlice } from '@/features/cbcHmac/slice';
import { Directive, inject, Signal } from '@angular/core';
import { UseAppAuthDir } from './0.use_app_auth';
import { LibEtc } from '@/core/lib/etc';
import { CbcHmacKeyTmrT } from '@/features/cbcHmac/reducer/reducer';
import { ConstantsApp } from '@/core/constants';
import { UseNavSvc } from '@/core/services/use_nav/use_nav';
import { TokenT } from '@/features/cbcHmac/etc/types';

@Directive()
export abstract class UseAppCbcHmacDir extends UseAppAuthDir {
  private readonly cbcHmacSlice: CbcHmacSlice = inject(CbcHmacSlice);
  private readonly useNav: UseNavSvc = inject(UseNavSvc);

  private timerSavingID: TimerIdT = null;
  private timerDeletingID: TimerIdT = null;

  protected populateCbcHmac(): void {
    const cbcHmac: Nullable<string> = this.useStorage.getItem('cbcHmacToken');
    if (!cbcHmac) return;
    this.cbcHmacSlice.saveCbcHmac(cbcHmac, { startTmr: false });
  }

  public resetSavingCbcHmac(): void {
    this.resetCbcHmacTmr('saving', this.cbcHmacSlice.saving, 'timerSavingID');
  }

  public resetClearingCbcHmac(): void {
    this.resetCbcHmacTmr('deleting', this.cbcHmacSlice.deleting, 'timerDeletingID');
  }

  private resetCbcHmacTmr(
    key: CbcHmacKeyTmrT,
    valSig: Signal<boolean>,
    timerRef: 'timerSavingID' | 'timerDeletingID'
  ): void {
    const val = valSig();
    if (!val) return;

    this[timerRef] = setTimeout(() => {
      if (!valSig()) {
        this[timerRef] = LibEtc.clearTmrID(this[timerRef]);
        return;
      }

      if (key === 'saving') this.cbcHmacSlice.setSavingTmr(false);
      else this.cbcHmacSlice.setDeletingTmr(false);
      this[timerRef] = LibEtc.clearTmrID(this[timerRef]);
    }, ConstantsApp.TIMER_RESET_WINDOW);
  }

  private isOutOfPlace(tokenT: TokenT, goingTo: string): boolean {
    return (
      (tokenT === TokenT.MANAGE_ACC && !goingTo.startsWith('/user/manage-account')) ||
      (tokenT === TokenT.RECOVER_PWD && !goingTo.startsWith('/auth/recover-pwd')) ||
      (tokenT === TokenT.LOGIN_2FA && !goingTo.startsWith('/auth/login-2fa')) ||
      (tokenT === TokenT.MANAGE_ACC_2FA && !goingTo.startsWith('/user/access-manage-account-2fa'))
    );
  }

  public delCbcHmacOnNavOut(): void {
    this.usePlatform.onClient(() => {
      const tokenT: Nullable<TokenT> = this.cbcHmacSlice.getTokenT();
      const goingTo: Nullable<string> = this.useNav.goingTo();

      if (!tokenT || !goingTo || this.cbcHmacSlice.saving()) return;

      if (this.isOutOfPlace(tokenT, goingTo)) this.cbcHmacSlice.clearCbcHmac({ startTmr: false });
    });
  }
}
