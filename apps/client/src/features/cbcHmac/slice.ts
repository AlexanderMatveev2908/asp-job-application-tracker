import { computed, Injectable, Signal } from '@angular/core';
import { CbcHmacStateT } from './reducer/reducer';
import { getCbcHmacState } from './reducer/selectors';
import { UseKitSliceSvc } from '@/core/hooks/kits/use_kit_slice';
import { Nullable } from '@/common/types/etc';
import { CbcHmacActT } from './reducer/actions';
import { AadCbcHmacT, TokenT } from './etc/types';
import { LibCbcHmac } from './etc/lib';
import { Reg } from '@/core/paperwork/reg';

export interface OptSaveCbcHmacT {
  startTmr: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class CbcHmacSlice extends UseKitSliceSvc {
  // eslint-disable-next-line no-magic-numbers
  public static readonly RESET_TMR: number = 2 * 1000;

  public get cbcHmacState(): Signal<CbcHmacStateT> {
    return this.store.selectSignal(getCbcHmacState);
  }

  private setCbcHmac(arg: Nullable<string>): void {
    this.store.dispatch(CbcHmacActT.SET_CBC_HMAC({ cbcHmacToken: arg }));
  }
  public setSaving(val: boolean): void {
    this.store.dispatch(CbcHmacActT.SET_SAVING({ val }));
  }
  public setClearing(val: boolean): void {
    this.store.dispatch(CbcHmacActT.SET_DELETING({ val }));
  }

  public saveCbcHmac(arg: string, { startTmr }: OptSaveCbcHmacT): void {
    this.setCbcHmac(arg);

    this.useStorage.setItem('cbcHmacToken', arg);
    if (startTmr) this.setSaving(true);
  }

  public clearCbcHmac(): void {
    this.setCbcHmac(null);
    this.useStorage.delItem('cbcHmacToken');

    this.setClearing(true);
  }

  public cbcHmac: Signal<Nullable<string>> = computed(() => this.cbcHmacState().cbcHmacToken);

  public present: Signal<boolean> = computed(
    () => !!this.useStorage.getItem('cbcHmacToken') || !!this.cbcHmacState().cbcHmacToken
  );

  public getTokenT(): Nullable<TokenT> {
    const token: Nullable<string> = this.cbcHmacState().cbcHmacToken;

    if (!token || !Reg.isCbcHmac(token)) return null;
    const aad: Nullable<AadCbcHmacT> = LibCbcHmac.aadFrom(token);

    return aad?.tokenT ?? null;
  }

  public isType(expected: TokenT): boolean {
    return LibCbcHmac.isOfType(this.cbcHmac(), expected);
  }
  public isTypeOrClearing(expected: TokenT): boolean {
    return this.isType(expected) || this.deleting();
  }
  public isNullOrSaving(): boolean {
    return this.cbcHmac() === null || this.saving();
  }

  public saving: Signal<boolean> = computed(() => this.cbcHmacState().saving);
  public deleting: Signal<boolean> = computed(() => this.cbcHmacState().deleting);

  public reset(): void {
    this.store.dispatch(CbcHmacActT.RESET_CBC_HMAC_STATE());
  }
}
