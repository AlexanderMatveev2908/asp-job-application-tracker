import { inject, Injectable } from '@angular/core';
import { UsePlatformSvc } from './use_platform';
import { Log } from '../lib/dev/log';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UseNavSvc {
  private readonly usePlatform: UsePlatformSvc = inject(UsePlatformSvc);
  private readonly router: Router = inject(Router);

  private async _nav(arg: string, { replace }: { replace: boolean }): Promise<boolean> {
    if (this.usePlatform.isServer) {
      Log.log('can not call navigate on server side');
      return Promise.resolve(false);
    }

    return await this.router.navigate([arg], {
      replaceUrl: replace,
    });
  }

  public async replace(arg: string): Promise<boolean> {
    return this._nav(arg, { replace: true });
  }

  public async push(arg: string): Promise<boolean> {
    return this._nav(arg, { replace: false });
  }
}
