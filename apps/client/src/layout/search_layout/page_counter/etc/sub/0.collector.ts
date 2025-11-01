import { Directive, inject, input, InputSignal, signal, WritableSignal } from '@angular/core';
import {
  UseSearchBarPaginationPropsDir,
  UseSearchBarStrategyPropsDir,
} from '@/layout/search_layout/search_bar/etc/directives/use_search_bar_props';
import { UsePaginationHk } from '@/layout/search_layout/search_bar/etc/hooks/use_pagination';
import { UseInjCtxHk } from '@/core/hooks/use_inj_ctx';

@Directive()
export abstract class UsePageCounterCollectorDir<T> extends UseInjCtxHk {
  // ? directives
  public readonly useSearchBarStrategyProps: UseSearchBarStrategyPropsDir<T> = inject(
    UseSearchBarStrategyPropsDir
  );
  public readonly useSearchbarPaginationPropsDir: UseSearchBarPaginationPropsDir = inject(
    UseSearchBarPaginationPropsDir
  );

  // ? personal props
  public readonly usePagination: InputSignal<UsePaginationHk> = input.required();

  // ? local state
  public readonly pagesPerBlock: WritableSignal<number> = signal(1);
}
