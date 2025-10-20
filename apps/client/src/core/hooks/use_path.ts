import { Nullable } from '@/common/types/etc';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsePathSvc {
  private readonly router: Router = inject(Router);

  public readonly currPath: WritableSignal<Nullable<string>> = signal(null);

  constructor() {
    this.router.events
      .pipe(filter((e: unknown) => e instanceof NavigationEnd))
      .subscribe((e: NavigationEnd) => this.currPath.set(e.urlAfterRedirects));
  }
}
