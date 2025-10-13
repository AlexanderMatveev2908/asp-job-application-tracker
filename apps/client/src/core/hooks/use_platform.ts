import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UsePlatformSvc {
  private readonly platformID = inject(PLATFORM_ID);

  public readonly isClient: boolean = isPlatformBrowser(this.platformID);
}
