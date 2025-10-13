import { inject, Injectable, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsePathSvc {
  private readonly router = inject(Router);

  public readonly currPath = signal<string | null>(null);

  constructor() {
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((e) => this.currPath.set(e.urlAfterRedirects));
  }
}
