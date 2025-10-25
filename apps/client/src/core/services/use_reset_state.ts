import { inject, Injectable } from '@angular/core';
import { UseStorageSvc } from './use_storage';
import { CbcHmacSlice } from '@/features/cbcHmac/slice';
import { UserSlice } from '@/features/user/slice';

@Injectable({
  providedIn: 'root',
})
export class UseResetStateSvc {
  private readonly useStorage: UseStorageSvc = inject(UseStorageSvc);
  private readonly cbcHmacSlice: CbcHmacSlice = inject(CbcHmacSlice);
  private readonly userSlice: UserSlice = inject(UserSlice);

  public main(): void {
    this.useStorage.cleanAll();
    this.cbcHmacSlice.reset();
    this.userSlice.reset();
  }
}
