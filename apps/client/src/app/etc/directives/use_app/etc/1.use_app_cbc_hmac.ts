import { Nullable } from '@/common/types/etc';
import { CbcHmacSlice } from '@/features/cbcHmac/slice';
import { Directive, inject } from '@angular/core';
import { UseAppAuthDir } from './0.use_app_auth';

@Directive()
export abstract class UseAppCbcHmacDir extends UseAppAuthDir {
  private readonly cbcHmacSlice: CbcHmacSlice = inject(CbcHmacSlice);

  protected populateCbcHmac(): void {
    const cbcHmac: Nullable<string> = this.useStorage.getItem('cbcHmacToken');

    if (!cbcHmac) return;

    this.cbcHmacSlice.saveCbcHmac(cbcHmac, true);
  }
}
