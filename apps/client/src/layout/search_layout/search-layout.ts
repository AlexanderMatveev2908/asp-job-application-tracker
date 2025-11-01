import { ChangeDetectionStrategy, Component, inject, input, InputSignal } from '@angular/core';
import { PageWrapper } from '../page_wrapper/page-wrapper';
import { PageCounter } from './page_counter/page-counter';
import { SearchBar } from './search_bar/search-bar';
import {
  UseSearchBarPaginationPropsDir,
  UseSearchBarPropsDir,
  UseSearchBarStrategyPropsDir,
} from './search_bar/etc/directives/use_search_bar_props';
import { HitsCounter } from './hits_counter/hits-counter';
import { UseDebounceHk } from './search_bar/etc/hooks/use_debounce';
import { BaseSearchBarFormT } from './search_bar/etc/paperwork';
import { PaginationArgT, SearchQueryArgT } from './search_bar/etc/types';
import { LibSearchBar } from './search_bar/etc/lib';
import { UsePaginationHk } from './search_bar/etc/hooks/use_pagination';
import { Observable } from 'rxjs';

export interface TriggerStrategyArgT<T> {
  dataForm?: BaseSearchBarFormT<T>;
  dataPagination?: PaginationArgT;
}

@Component({
  selector: 'app-search-layout',
  imports: [
    PageWrapper,
    SearchBar,
    PageCounter,
    HitsCounter,
    UseSearchBarPropsDir,
    UseSearchBarStrategyPropsDir,
    UseSearchBarPaginationPropsDir,
  ],
  templateUrl: './search-layout.html',
  styleUrl: './search-layout.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UseDebounceHk, UsePaginationHk],
})
export class SearchLayout<T> {
  // ? directives
  public readonly useSearchBarProps: UseSearchBarPropsDir<T> = inject(UseSearchBarPropsDir);
  public readonly useSearchBarPaginationProps: UseSearchBarPaginationPropsDir = inject(
    UseSearchBarPaginationPropsDir
  );

  // ? personal props
  public readonly strategy: InputSignal<(data: SearchQueryArgT) => Observable<unknown>> =
    input.required();
  public readonly isPending: InputSignal<boolean> = input.required();

  // ? hooks
  public readonly useDebounce: UseDebounceHk<T> = inject(UseDebounceHk);
  public readonly usePagination: UsePaginationHk = inject(UsePaginationHk);

  // ? listeners
  public readonly triggerStrategy: (arg?: TriggerStrategyArgT<T>) => void = (
    arg?: TriggerStrategyArgT<T>
  ) => {
    const dataNow: BaseSearchBarFormT<T> = arg?.dataForm ?? this.useSearchBarProps.form().value;
    this.useDebounce.forceSetPrevForm(dataNow);

    const dataWithPagination: SearchQueryArgT = LibSearchBar.searchDataOf(
      dataNow,
      arg?.dataPagination
    );

    this.strategy()(dataWithPagination).subscribe();
  };
}
