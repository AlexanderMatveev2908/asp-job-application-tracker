import { Nullable } from '@/common/types/etc';
import { inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { Navigation, NavigationEnd, Params, Router } from '@angular/router';
import { filter } from 'rxjs';
import { ShapeCheck } from '@/core/lib/data_structure/shape_check';

// | make navigation predictable & avoid misspelling passing arguments
export type NavFromT = 'error' | 'ok';

export interface MetaNavT {
  from: Nullable<NavFromT>;
}

@Injectable()
export abstract class UsePath {
  protected readonly router: Router = inject(Router);

  private readonly _currPath: WritableSignal<Nullable<string>> = signal(null);
  private readonly _meta: WritableSignal<Nullable<MetaNavT>> = signal(null);
  private readonly _query: WritableSignal<Nullable<Params>> = signal(null);

  public readonly meta: Signal<Nullable<MetaNavT>> = this._meta.asReadonly();
  public readonly currPath: Signal<Nullable<string>> = this._currPath.asReadonly();
  public readonly query: Signal<Nullable<Params>> = this._query.asReadonly();

  private readonly ALLOWED_FROM: Set<NavFromT> = new Set<NavFromT>(['error', 'ok']);

  public allowedFrom(): boolean {
    const meta: Nullable<MetaNavT> = this.meta();

    if (!meta?.from || !this.ALLOWED_FROM.has(meta?.from)) return false;

    return true;
  }

  public ifPathStartsWith(arg: string, cb: (path: string) => void): void {
    const path: Nullable<string> = this.currPath();
    if (!path || !path.startsWith(arg)) return;

    cb(path);
  }

  constructor() {
    this.router.events
      .pipe(filter((e: unknown) => e instanceof NavigationEnd))
      .subscribe((e: NavigationEnd) => {
        this._currPath.set(e.urlAfterRedirects);

        const navigation: Nullable<Navigation> = this.router.currentNavigation();
        this._meta.set((navigation?.extras.state as MetaNavT) ?? null);

        const queryParams: Params = this.router.routerState.snapshot.root.queryParams;
        this._query.set(ShapeCheck.hasObjData(queryParams) ? queryParams : null);
      });
  }
}
