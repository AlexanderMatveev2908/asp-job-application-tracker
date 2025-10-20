import { Injectable } from '@angular/core';
import { SideEffectsNoticeSvc } from './2.notice';
import { ObsOnOkT, ObsResT } from '../types';
import { ArgsApi } from '../request/args_api';

@Injectable({
  providedIn: 'root',
})
export class SideEffectsMng extends SideEffectsNoticeSvc {
  public mng<T>(cb: ObsResT<T>, args: ArgsApi): ObsOnOkT<T> {
    return this.withNotice(this.withToast(cb, args.getOptToast()), args.getOptErr());
  }
}
