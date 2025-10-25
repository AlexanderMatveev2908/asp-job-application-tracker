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

  public delCbcHmacOnNavOut(): void {
    this.usePlatform.onClient(() => {
      const tokenT: Nullable<TokenT> = this.cbcHmacSlice.getTokenT();
      const path: Nullable<string> = this.useNav.currPath();

      if (!tokenT || !path || this.cbcHmacSlice.saving()) return;

      if (
        (tokenT === TokenT.MANAGE_ACC && !path.startsWith('/user/manage-account')) ||
        (tokenT === TokenT.RECOVER_PWD && !path.startsWith('/auth/recover-pwd'))
      )
        this.cbcHmacSlice.clearCbcHmac({ startTmr: false });
    });
  }
}
