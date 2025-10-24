/* eslint-disable @typescript-eslint/prefer-readonly */
import { Nullable, TimerIdT } from '@/common/types/etc';
import { LibEtc } from '@/core/lib/etc';
import { LoggingKeyT } from '@/features/auth/reducer/actions';
import { AuthSlice } from '@/features/auth/slice';
import { Directive, inject, Signal } from '@angular/core';
import { UseStorageSvc } from '@/core/hooks/use_storage';
import { UseInjCtxSvc } from '@/core/hooks/platform/use_inj_ctx';
import { ConstantsApp } from '@/core/constants';

@Directive()
export abstract class UseAppAuthDir extends UseInjCtxSvc {
  protected readonly useStorage: UseStorageSvc = inject(UseStorageSvc);
  protected readonly authSlice: AuthSlice = inject(AuthSlice);

  private timerInID: TimerIdT = null;
  private timerOutID: TimerIdT = null;

  protected markUserLogged(): void {
    const jwt: Nullable<string> = this.useStorage.getItem('accessToken');
    if (jwt) this.authSlice.login(jwt, { startTmr: false });
  }

  protected resetLoggingInTmr(): void {
    this.resetLoggingTmr('loggingIn', this.authSlice.loggingIn, 'timerInID');
  }

  protected resetLoggingOutTmr(): void {
    this.resetLoggingTmr('loggingOut', this.authSlice.loggingOut, 'timerOutID');
  }

  private resetLoggingTmr(
    key: LoggingKeyT,
    valSig: Signal<boolean>,
    timerRef: 'timerInID' | 'timerOutID'
  ): void {
    const val = valSig();
    if (!val) return;

    this[timerRef] = setTimeout(() => {
      if (!valSig()) {
        this[timerRef] = LibEtc.clearTmrID(this[timerRef]);
        return;
      }

      this.authSlice.endLoggingTmr(key);
      this[timerRef] = LibEtc.clearTmrID(this[timerRef]);
    }, ConstantsApp.TIMER_RESET_WINDOW);
  }
}
