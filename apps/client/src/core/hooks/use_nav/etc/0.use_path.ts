import { Nullable } from '@/common/types/etc';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Injectable()
export abstract class UsePath {
  protected readonly router: Router = inject(Router);

  public readonly currPath: WritableSignal<Nullable<string>> = signal(null);

  constructor() {
    this.router.events
      .pipe(filter((e: unknown) => e instanceof NavigationEnd))
      .subscribe((e: NavigationEnd) => this.currPath.set(e.urlAfterRedirects));
  }
}
