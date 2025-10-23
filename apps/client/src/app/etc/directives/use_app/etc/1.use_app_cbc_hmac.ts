import { Nullable, TimerIdT } from '@/common/types/etc';
import { CbcHmacSlice } from '@/features/cbcHmac/slice';
import { Directive, inject } from '@angular/core';
import { UseAppAuthDir } from './0.use_app_auth';
import { LibEtc } from '@/core/lib/etc';

@Directive()
export abstract class UseAppCbcHmacDir extends UseAppAuthDir {
  private readonly cbcHmacSlice: CbcHmacSlice = inject(CbcHmacSlice);

  private timerID: TimerIdT = null;

  protected populateCbcHmac(): void {
    const cbcHmac: Nullable<string> = this.useStorage.getItem('cbcHmacToken');

    if (!cbcHmac) return;

    this.cbcHmacSlice.saveCbcHmac(cbcHmac, true);
  }

  protected resetCbcTmr(): void {
    const deleting: boolean = this.cbcHmacSlice.deleting();

    if (deleting)
      this.timerID = setTimeout(() => {
        if (!this.cbcHmacSlice.deleting()) return;

        this.cbcHmacSlice.endClearing();
        this.timerID = LibEtc.clearTmrID(this.timerID);
      }, CbcHmacSlice.DELETING_RESET_TMR);
  }
}
