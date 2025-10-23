import { inject, Injectable } from '@angular/core';
import { UsePlatformSvc } from './use_platform';
import { Log } from '../lib/dev/log';
import { ErrApp } from '../lib/err';
import { ShapeCheck } from '../lib/data_structure/shape_check';
import { Prs } from '../lib/data_structure/prs';
import { Stack } from '../lib/dev/stack';
import { Nullable } from '@/common/types/etc';

export type StorageKeyT = 'notice' | 'accessToken' | 'wakeUp' | 'cbcHmacToken';

@Injectable({
  providedIn: 'root',
})
export class UseStorageSvc {
  private readonly usePlatform: UsePlatformSvc = inject(UsePlatformSvc);

  private checkEnv<T>(cb: () => T): Nullable<T> {
    if (this.usePlatform.isServer) {
      Log.log(`can not run ${Stack.getCallerLess(1)} on server side`);
      return null;
    }

    return cb();
  }

  public cleanAll(): Nullable<void> {
    return this.checkEnv(() => {
      sessionStorage.clear();
    });
  }

  public setItem<T>(key: StorageKeyT, data: T): Nullable<void> {
    return this.checkEnv(() => {
      if (ShapeCheck.isNone(data)) throw new ErrApp('passed None to set storage');
      else if (ShapeCheck.isPrimitive(data)) sessionStorage.setItem(key, data + '');
      else sessionStorage.setItem(key, JSON.stringify(data));
    });
  }

  public getItem<T>(key: StorageKeyT): Nullable<T> {
    return this.checkEnv(() => {
      const data: unknown = sessionStorage.getItem(key);

      if (ShapeCheck.isNone(data) || ShapeCheck.isNoneBug(data)) {
        return null;
      } else {
        const str: string = data as string;

        try {
          if (ShapeCheck.isJsonObj(str)) return JSON.parse(str) as T;
        } catch {
          Log.log('isJsonObj failed check');
          return str as T;
        }

        // ? small help to return true|false as real boolean and not literal strings
        return (ShapeCheck.isBoolStr(str) ? Prs.strToBool(str) : str) as T;
      }
    });
  }

  public delItem(key: StorageKeyT): void {
    sessionStorage.removeItem(key);
  }
}
