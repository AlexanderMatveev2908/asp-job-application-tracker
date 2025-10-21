import { Injectable, Signal } from '@angular/core';
import { AuthStateT } from './reducer/reducer';
import { getAuthState } from './reducer/selectors';
import { UseKitSlice } from '@/core/directives/use_kit_slice';
import { AuthActT } from './reducer/actions';

@Injectable({
  providedIn: 'root',
})
export class AuthSlice extends UseKitSlice {
  public get authState(): Signal<AuthStateT> {
    return this.store.selectSignal(getAuthState);
  }

  // ! when checking if a user is logged or not on a certain page
  // ! there may be cases where it is already pushed out or logging in
  // ! so u do not want to repeat a certain event but give it margin of action
  // eslint-disable-next-line no-magic-numbers
  private readonly TIMER_RESET_LOGGING: number = 2.5 * 1000;

  public login(accessToken: string): void {
    this.store.dispatch(AuthActT.LOGIN());
    this.useStorage.setItem('accessToken', accessToken);

    setTimeout(() => {
      this.store.dispatch(AuthActT.RESET_LOGGING_STATE({ key: 'loggingIn' }));
    }, this.TIMER_RESET_LOGGING);
  }

  public loggingPending(): boolean {
    const state: AuthStateT = this.authState();
    return state.loggingIn || state.loggingOut;
  }
}
