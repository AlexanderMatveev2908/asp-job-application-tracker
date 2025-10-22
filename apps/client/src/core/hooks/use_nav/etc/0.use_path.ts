import { Nullable } from '@/common/types/etc';
import { inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { Navigation, NavigationEnd, Params, Router } from '@angular/router';
import { filter } from 'rxjs';
import { NavFromT } from './1.use_router';
import { ShapeCheck } from '@/core/lib/data_structure/shape_check';

export interface MetaNav {
  from: Nullable<NavFromT>;
}

@Injectable()
export abstract class UsePath {
  protected readonly router: Router = inject(Router);

  private readonly _currPath: WritableSignal<Nullable<string>> = signal(null);
  private readonly _meta: WritableSignal<Nullable<MetaNav>> = signal(null);
  private readonly _query: WritableSignal<Nullable<Params>> = signal(null);

  public readonly meta: Signal<Nullable<MetaNav>> = this._meta.asReadonly();
  public readonly currPath: Signal<Nullable<string>> = this._currPath.asReadonly();
  public readonly query: Signal<Nullable<Params>> = this._query.asReadonly();

  constructor() {
    this.router.events
      .pipe(filter((e: unknown) => e instanceof NavigationEnd))
      .subscribe((e: NavigationEnd) => {
        this._currPath.set(e.urlAfterRedirects);

        const navigation: Nullable<Navigation> = this.router.currentNavigation();
        this._meta.set((navigation?.extras.state as MetaNav) ?? null);

        const queryParams: Params = this.router.routerState.snapshot.root.queryParams;
        this._query.set(ShapeCheck.hasObjData(queryParams) ? queryParams : null);
      });
  }
}
