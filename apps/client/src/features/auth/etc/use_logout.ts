import { inject, Injectable } from '@angular/core';
import { UseAuthKitSvc } from './use_auth_kit';
import { ObsResT, ResApiT } from '@/core/store/api/etc/types';
import { from, tap } from 'rxjs';
import { UseNavSvc } from '@/core/hooks/use_nav/use_nav';
import { UseStorageSvc } from '@/core/hooks/use_storage';
import { CbcHmacSlice } from '@/features/cbcHmac/slice';
import { UserSlice } from '@/features/user/slice';

@Injectable({
  providedIn: 'root',
})
export class UseLogout {
  private readonly useAuthKit: UseAuthKitSvc = inject(UseAuthKitSvc);
  private readonly useNav: UseNavSvc = inject(UseNavSvc);
  private readonly useStorage: UseStorageSvc = inject(UseStorageSvc);
  private readonly cbcHmacSlice: CbcHmacSlice = inject(CbcHmacSlice);
  private readonly userSlice: UserSlice = inject(UserSlice);

  public main(): ObsResT<void> {
    return this.useAuthKit.authApi.logout().pipe(
      tap((_: ResApiT<void>) => {
        this.useAuthKit.authSlice.logout(true);
        this.useStorage.cleanAll();
        this.cbcHmacSlice.reset();
        this.userSlice.reset();

        return from(this.useNav.replace('/'));
      })
    );
  }
}
