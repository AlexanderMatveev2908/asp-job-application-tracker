import { computed, Directive, inject, Signal } from '@angular/core';
import { UseNavSvc } from '../hooks/use_nav/use_nav';
import { UserSlice } from '@/features/user/slice';
import { AuthSlice } from '@/features/auth/slice';
import { UseInjCtxSvc } from '../hooks/platform/use_inj_ctx';

@Directive()
export abstract class UseRouterProtectionDir extends UseInjCtxSvc {
  protected readonly useNav: UseNavSvc = inject(UseNavSvc);
  protected readonly userSlice: UserSlice = inject(UserSlice);
  protected readonly authSlice: AuthSlice = inject(AuthSlice);

  protected readonly isLoggedAllowed: Signal<boolean> = computed(
    () =>
      this.authSlice.isLogged() ||
      this.authSlice.authState().loggingOut ||
      !this.userSlice.handshake()
  );
  protected isNonLoggedAllowed: Signal<boolean> = computed(
    () => !this.authSlice.isLogged() || this.authSlice.loggingIn()
  );

  protected pushOutNotLogged(path: string): void {
    this.useEffect(() => {
      this.useNav.ifPathStartsWith(path, () => {
        if (this.isLoggedAllowed()) return;

        void this.useNav.replace('/auth/login');
      });
    });
  }

  protected pushOutLogged(path: string): void {
    this.useEffect(() => {
      this.useNav.ifPathStartsWith(path, () => {
        if (this.isNonLoggedAllowed()) return;

        void this.useNav.replace('/');
      });
    });
  }
}
