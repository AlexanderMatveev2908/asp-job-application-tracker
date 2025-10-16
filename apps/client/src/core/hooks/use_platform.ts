import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { ApplicationRef, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { EMPTY, filter, Observable, take, switchMap } from 'rxjs';
import { ResApiT } from '../store/api/etc/types';

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

  private isStable(): Observable<boolean> {
    return this.appRef.isStable.pipe(filter(Boolean), take(1));
  }

  public whenStable<T>(cb: Observable<ResApiT<T>>): Observable<ResApiT<T>> {
    return this.isStable().pipe(switchMap(() => cb));
  }

  public whenClientStable<T>(cb: Observable<ResApiT<T>>): Observable<ResApiT<T> | never> {
    return this.isClient ? this.isStable().pipe(switchMap(() => cb)) : EMPTY;
  }
}
