import { Injectable, Signal } from '@angular/core';
import { CbcHmacStateT } from './reducer/reducer';
import { getCbcHmacState } from './reducer/selectors';
import { UseKitSliceSvc } from '@/core/hooks/kits/use_kit_slice';
import { Nullable } from '@/common/types/etc';
import { CbcHmacActT } from './reducer/actions';
import { AadCbcHmacT, TokenT } from './etc/types';
import { LibCbcHmac } from './etc/lib';
import { Reg } from '@/core/paperwork/reg';

@Injectable({
  providedIn: 'root',
})
export class CbcHmacSlice extends UseKitSliceSvc {
  public get cbcHmacState(): Signal<CbcHmacStateT> {
    return this.store.selectSignal(getCbcHmacState);
  }

  private setCbcHmac(arg: Nullable<string>): void {
    this.store.dispatch(CbcHmacActT.SET_CBC_HMAC({ cbcHmacToken: arg }));
  }

  public saveCbcHmac(arg: string): void;
  public saveCbcHmac(arg: string, presentInStorage: boolean): void;

  public saveCbcHmac(arg: string, presentInStorage?: boolean): void {
    this.setCbcHmac(arg);

    if (!presentInStorage) this.useStorage.setItem('cbcHmacToken', arg);
  }
  public clearCbcHmac(): void {
    this.setCbcHmac(null);
    this.useStorage.delItem('cbcHmacToken');
  }

  public getTokenT(): Nullable<TokenT> {
    const token: Nullable<string> = this.cbcHmacState().cbcHmacToken;

    if (!token || !Reg.isCbcHmac(token)) return null;
    const aad: Nullable<AadCbcHmacT> = LibCbcHmac.aadFrom(token);

    return aad?.tokenT ?? null;
  }
}
