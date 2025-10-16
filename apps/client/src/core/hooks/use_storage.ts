import { inject, Injectable } from '@angular/core';
import { UsePlatformSvc } from './use_platform';
import { Log } from '../lib/log';
import { StorageKeyT } from '@/common/types/storage_keys';
import { ErrApp } from '../lib/err';
import { ShapeCheck } from '../lib/data_structure/shape';
import { Prs } from '../lib/data_structure/formatters';
import { Stack } from '../lib/stack';

@Injectable({
  providedIn: 'root',
})
export class UseStorageSvc {
  private readonly usePlatform: UsePlatformSvc = inject(UsePlatformSvc);

  private checkEnv<T>(cb: () => T): T | null {
    if (this.usePlatform.isServer) {
      Log.log(`can not run ${Stack.getCallerLess(1)} on server side`);
      return null;
    }

    return cb();
  }

  public cleanAll(): void | null {
    return this.checkEnv(() => {
      sessionStorage.clear();
    });
  }

  public setItem<T>(key: StorageKeyT, data: T): void | null {
    return this.checkEnv(() => {
      if (ShapeCheck.isNone(data)) throw new ErrApp('passed None to set storage');
      else if (ShapeCheck.isPrimitive(data)) sessionStorage.setItem(key, data + '');
      else sessionStorage.setItem(key, JSON.stringify(data));
    });
  }

  public getItem<T>(key: StorageKeyT): T | null {
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
}
