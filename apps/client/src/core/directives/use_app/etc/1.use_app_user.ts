import { UseUserKitSvc } from '@/features/user/etc/use_user_kit';
import { Directive, inject } from '@angular/core';
import { UseAppAuthDir } from './0.use_app_auth';
import { finalize, tap } from 'rxjs';
import { ErrApiT, ResApiT } from '@/core/store/api/etc/types';
import { ResProfileT } from '@/features/user/etc/types';

@Directive()
export abstract class UseAppUserDir extends UseAppAuthDir {
  protected readonly useUserKit: UseUserKitSvc = inject(UseUserKitSvc);

  protected fetchUser(): void {
    void this.authSlice.isLogged();
    void this.useUserKit.userSlice.mark();

    this.useUserKit.userSlice.setPending(true);
    this.useUserKit.userApi
      .getUser()
      .pipe(
        tap({
          next: (res: ResApiT<ResProfileT>) => {
            if (res?.user) this.useUserKit.userSlice.setUser(res.user);
            else this.useUserKit.userSlice.markNull();
          },
          error: (_: ErrApiT<void>) => {
            this.useUserKit.userSlice.markNull();
          },
        }),
        finalize(() => this.useUserKit.userSlice.setPending(false))
      )
      .subscribe();
  }
}
