import { computed, Injectable, Signal } from '@angular/core';
import { AuthStateT } from './reducer/reducer';
import { getAuthState } from './reducer/selectors';
import { UseKitSliceSvc } from '@/core/hooks/kits/use_kit_slice';
import { AuthActT, LoggingKeyArgT, LoggingKeyT } from './reducer/actions';
import { Nullable } from '@/common/types/etc';

@Injectable({
  providedIn: 'root',
})
export class AuthSlice extends UseKitSliceSvc {
  public get authState(): Signal<AuthStateT> {
    return this.store.selectSignal(getAuthState);
  }

  // ! when checking if a user is logged or not on a certain page
  // ! there may be cases where it is already pushed out or logging in
  // ! so u do not want to repeat a certain event but give it margin of action
  // eslint-disable-next-line no-magic-numbers
  public static readonly TIMER_RESET_LOGGING: number = 2 * 1000;

  public login(): void;
  public login(accessToken: string): void;
  public login(accessToken: string, opt?: { withTmr: boolean }): void;

  public login(accessToken?: string, opt?: { withTmr?: boolean }): void {
    this.store.dispatch(AuthActT.LOGIN());
    if (accessToken) this.useStorage.setItem('accessToken', accessToken);
    if (opt?.withTmr) this.setLoggingKey({ key: 'loggingIn', val: true });
  }

  public logout(): void;
  public logout(withTmr: boolean): void;

  public logout(withTmr?: boolean): void {
    this.store.dispatch(AuthActT.LOGOUT());
    this.useStorage.delItem('accessToken');
    if (withTmr) this.setLoggingKey({ key: 'loggingOut', val: true });
  }

  private setLoggingKey(arg: LoggingKeyArgT): void {
    this.store.dispatch(AuthActT.SET_LOGGING_KEY(arg));
  }
  public clearLogging(key: LoggingKeyT): void {
    this.setLoggingKey({ key, val: false });
  }

  public isLogged: Signal<boolean> = computed(() => this.authState().isLogged);
  public loggingIn: Signal<boolean> = computed(() => this.authState().loggingIn);
  public loggingOut: Signal<boolean> = computed(() => this.authState().loggingOut);
  public cbcHmac: Signal<Nullable<string>> = computed(() => this.authState().cbcHmac);
}
