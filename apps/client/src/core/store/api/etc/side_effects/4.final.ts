import { Injectable } from '@angular/core';
import { SideEffectsNoticeSvc } from './3.notice';
import { ObsOnOkT, ObsResT } from '../types';
import { ApiArgs } from '../request/args';

@Injectable({
  providedIn: 'root',
})
export class SideEffectsMng extends SideEffectsNoticeSvc {
  public mng<T, K>(cb: ObsResT<T>, args: ApiArgs<K>): ObsOnOkT<T> {
    return this.withNotice(this.withToast(this.withLog(cb), args.getOptToast()), args.getOptErr());
  }
}
