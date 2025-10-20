import { Injectable } from '@angular/core';
import { SideEffectsRoot } from './0.root';
import { ConfApiT, ErrApiT, ObsResT, ResApiT } from '../types';
import { Nullable } from '@/common/types/etc';
import { HttpErrorResponse } from '@angular/common/http';
import { Log } from '@/core/lib/dev/log';
import { tap } from 'rxjs';
import { envVars } from '@/environments/environment';

@Injectable()
export abstract class SideEffectsLogSvc extends SideEffectsRoot {
  private _log<T>(res: ResApiT<T> | ErrApiT<T>, emoji: string): void {
    this.confApi.obs().subscribe((conf: Nullable<ConfApiT>) => {
      const content: ResApiT<T> = res instanceof HttpErrorResponse ? res.error : res;

      const title: string = (conf?.url ?? 'Unknown url').replace(envVars.backURL, '').split('?')[0];

      Log.logTtl(`${emoji} ${title}`, conf, content);
    });
  }

  protected withLog<T>(cb: ObsResT<T>): ObsResT<T> {
    return cb.pipe(
      tap({
        next: (res: ResApiT<T>) => this._log(res, '✅'),
        error: (err: ErrApiT<T>) => this._log(err, '❌'),
      })
    );
  }
}
