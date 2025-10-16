import { Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { ObsOnOkT } from './types';
import { finalize } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TrackerSvc {
  private readonly _isPending: WritableSignal<boolean> = signal(false);
  public readonly isPending: Signal<boolean> = this._isPending.asReadonly();

  public trackPending<T>(cb: ObsOnOkT<T>): ObsOnOkT<T> {
    this._isPending.set(true);

    return cb.pipe(
      finalize(() => {
        this._isPending.set(false);
      })
    );
  }
}
