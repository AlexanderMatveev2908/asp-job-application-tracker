import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { ApplicationRef, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { filter, Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsePlatformSvc {
  private readonly platformID: object = inject(PLATFORM_ID);
  private readonly appRef: ApplicationRef = inject(ApplicationRef);

  public readonly isClient: boolean = isPlatformBrowser(this.platformID);
  public readonly isServer: boolean = isPlatformServer(this.platformID);

  public runOnClientSync<T>(arg: () => T): T | null {
    return this.isServer ? null : arg();
  }

  public async runOnClientPromise<T>(arg: () => Promise<T>): Promise<T | null> {
    return this.isServer ? null : await arg();
  }

  public isStable(): Observable<boolean> {
    return this.appRef.isStable.pipe(filter(Boolean), take(1));
  }
}
