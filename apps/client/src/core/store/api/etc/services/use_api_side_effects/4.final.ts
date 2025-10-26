import { Injectable } from '@angular/core';
import { UseSideEffectsNoticeHk } from './3.notice';
import { ObsOnOkT, ObsResT } from '../../types';
import { LibApiArgs } from '../../lib/req_args/args';

@Injectable({
  providedIn: 'root',
})
export class UseApiSideEffectsSvc extends UseSideEffectsNoticeHk {
  public mng<T, K>(cb: ObsResT<T>, args: LibApiArgs<K>): ObsOnOkT<T> {
    return this.withNotice(this.withToast(this.withLog(cb), args.getOptToast()), args.getOptErr());
  }
}
