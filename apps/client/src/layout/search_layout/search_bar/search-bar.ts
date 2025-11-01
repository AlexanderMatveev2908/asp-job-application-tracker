import { Nullable } from '@/common/types/etc';
import { ChangeDetectionStrategy, Component, inject, OnInit, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormArray, FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormZodMng } from '@/core/paperwork/form_mng/form_zod_mng';
import { SearchBarTxtFieldsRow } from './etc/fragments/txt_fields_row/search-bar-txt-fields-row';
import { SearchBarBtnsRow } from './etc/fragments/btns_row/search-bar-btns-row';
import { SearchBarFilterBar } from './etc/fragments/filter_bar/search-bar-filter-bar';
import { UseBarsHk } from './etc/hooks/use_bars';
import { UseFiltersHk } from './etc/hooks/use_filters';
import { v4 } from 'uuid';
import { SearchBarSortBar } from './etc/fragments/sort_bar/search-bar-sort-bar';
import { UseSearchbarPropsDir } from './etc/directives/use_search_bar_props';
import { BaseSearchBarFormT } from './etc/paperwork';
import { UseDebounceHk } from './etc/hooks/use_debounce';
import { LibSearchBar } from './etc/lib';
import { SearchQueryArgT } from './etc/types';

@Component({
  selector: 'app-search-bar',
  imports: [
    ReactiveFormsModule,
    SearchBarTxtFieldsRow,
    SearchBarBtnsRow,
    SearchBarFilterBar,
    SearchBarSortBar,
  ],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UseBarsHk, UseFiltersHk, UseDebounceHk],
})
export class SearchBar<T> extends UseSearchbarPropsDir<T> implements OnInit {
  // ? hooks
  public readonly useBars: UseBarsHk = inject(UseBarsHk);
  public readonly useFilters: UseFiltersHk = inject(UseFiltersHk);
  public readonly useDebounce: UseDebounceHk<T> = inject(UseDebounceHk);

  private readonly triggerStrategyDebounce: (data: BaseSearchBarFormT<T>) => void = (
    data: BaseSearchBarFormT<T>
  ) => {
    const dataWithDefPagination: SearchQueryArgT = LibSearchBar.searchDataOf(data);

    this.strategy()(dataWithDefPagination).subscribe();
  };

  private readonly triggerStrategyNoDebounce: () => void = () => {
    const dataNow: BaseSearchBarFormT<T> = this.form().value;
    this.useDebounce.forceSetPrevForm(dataNow);

    this.triggerStrategyDebounce(dataNow);
  };

  // ? listeners
  public onSubmit(): void {
    if (!this.form().valid) {
      FormZodMng.onSubmitFailed(this.form());
      return;
    }

    this.triggerStrategyNoDebounce();
  }

  public readonly onErase: () => void = () => {
    const { txtInputs, ...plainCtrlFields }: BaseSearchBarFormT<T> = this.defState();

    this.form().patchValue(plainCtrlFields);
    const txtInputsFormArray: FormArray = this.form().get('txtInputs') as FormArray;
    txtInputsFormArray.clear();
    for (const f of txtInputs!) txtInputsFormArray.push(new FormControl({ ...f, id: v4() }));

    this.usePagination().reset();
    this.triggerStrategyNoDebounce();
  };

  // ? local state
  public formVal: Nullable<Signal<BaseSearchBarFormT<T>>> = null;

  ngOnInit(): void {
    this.inCtx(() => {
      this.formVal = toSignal(this.form().valueChanges, {
        initialValue: this.form().value,
      });
    });

    this.useDebounce.main({
      form: this.form(),
      formVal: this.formVal,
      triggerStrategyDebounce: this.triggerStrategyDebounce,
    });
  }
}
