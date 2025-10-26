import { Injectable } from '@angular/core';
import { SideEffectsNoticeHk } from './3.notice';
import { ObsOnOkT, ObsResT } from '../types';
import { ApiArgs } from '../req_args/args';

@Injectable({
  providedIn: 'root',
})
export class ApiSideEffectsSvc extends SideEffectsNoticeHk {
  public mng<T, K>(cb: ObsResT<T>, args: ApiArgs<K>): ObsOnOkT<T> {
    return this.withNotice(this.withToast(this.withLog(cb), args.getOptToast()), args.getOptErr());
  }
}
