import { GenericVoidCbT, GenericVoidT } from '@/common/types/etc';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UsePlatformSvc {
  private readonly platformID: object = inject(PLATFORM_ID);

  public readonly isClient: boolean = isPlatformBrowser(this.platformID);
  public readonly isServer: boolean = isPlatformServer(this.platformID);

  public runOnClient(arg: GenericVoidCbT): GenericVoidT | null {
    return this.isServer ? null : arg();
  }
}
