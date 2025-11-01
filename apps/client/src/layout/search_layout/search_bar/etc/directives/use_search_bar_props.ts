import { Directive, input, InputSignal } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseSearchBarFormT } from '../paperwork';
import { TxtFieldArrayT } from '@/common/types/forms';
import { SearchBarFilterT, SearchBarSorterT } from '../ui_fkt';
import { UseInjCtxHk } from '@/core/hooks/use_inj_ctx';
import { Nullable } from '@/common/types/etc';
import { UsePaginationHk } from '@/layout/search_layout/search_bar/etc/hooks/use_pagination';
import { Observable } from 'rxjs';
import { SearchQueryArgT } from '../types';

@Directive()
export abstract class UseSearchbarPropsDir<T> extends UseInjCtxHk {
  // ? props
  public readonly defState: InputSignal<BaseSearchBarFormT<T>> = input.required();
  public readonly form: InputSignal<FormGroup> = input.required();
  public readonly txtInputsAvailable: InputSignal<() => TxtFieldArrayT[]> = input.required();
  public readonly filtersAvailable: InputSignal<() => SearchBarFilterT[]> = input.required();
  public readonly sortersAvailable: InputSignal<() => SearchBarSorterT[]> = input.required();

  public readonly usePagination: InputSignal<UsePaginationHk> = input.required();

  public readonly strategy: InputSignal<(data: SearchQueryArgT) => Observable<unknown>> =
    input.required();
}

@Directive()
export abstract class UseSearchBarPropsWithPaginationDir<T> extends UseSearchbarPropsDir<T> {
  // ? page related
  public readonly totPages: InputSignal<Nullable<number>> = input.required();
  public readonly nHits: InputSignal<Nullable<number>> = input.required();
}
