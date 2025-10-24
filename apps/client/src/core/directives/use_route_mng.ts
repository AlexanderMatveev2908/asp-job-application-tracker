import { computed, Directive, inject, Signal } from '@angular/core';
import { UseNavSvc } from '../hooks/use_nav/use_nav';
import { UserSlice } from '@/features/user/slice';
import { AuthSlice } from '@/features/auth/slice';
import { UseInjCtxSvc } from '../hooks/platform/use_inj_ctx';
import { CbcHmacSlice } from '@/features/cbcHmac/slice';
import { TokenT } from '@/features/cbcHmac/etc/types';

@Directive()
export class UseRouteMngDir extends UseInjCtxSvc {
  protected readonly useNav: UseNavSvc = inject(UseNavSvc);
  protected readonly userSlice: UserSlice = inject(UserSlice);
  protected readonly authSlice: AuthSlice = inject(AuthSlice);
  protected cbcHmacSlice: CbcHmacSlice = inject(CbcHmacSlice);

  protected readonly isLoggedAllowed: Signal<boolean> = computed(
    () =>
      this.authSlice.isLogged() ||
      this.authSlice.authState().loggingOut ||
      !this.userSlice.handshake()
  );
  protected readonly isNonLoggedAllowed: Signal<boolean> = computed(
    () => !this.authSlice.isLogged() || this.authSlice.loggingIn()
  );

  public pushOutNotLogged(path: string): void {
    this.useEffect(() => {
      this.useNav.ifPathStartsWith(path, () => {
        if (this.isLoggedAllowed()) return;

        void this.useNav.replace('/auth/login');
      });
    });
  }

  public pushOutLogged(path: string): void {
    this.useEffect(() => {
      this.useNav.ifPathStartsWith(path, () => {
        if (this.isNonLoggedAllowed()) return;

        void this.useNav.replace('/');
      });
    });
  }

  public pushOutIfNotFrom(path: string): void {
    this.useEffect(() => {
      this.useNav.ifPathStartsWith(path, () => {
        if (this.useNav.allowedFrom()) return;

        void this.useNav.replace('/');
      });
    });
  }

  public pushOutIfNotTokenType(path: string, expected: TokenT): void {
    this.useEffect(() => {
      this.useNav.ifPathStartsWith(path, () => {
        void this.cbcHmacSlice.cbcHmac();

        // ! right after success i delete cbc and to avoid being pushed away i use an internal flag to have a short window to go instead to notice page
        // | i used same strategy for auth in auth out
        if (this.useNav.allowedFrom() && this.cbcHmacSlice.isTypeOrClearing(expected)) return;

        void this.useNav.replace('/');
      });
    });
  }
}
