import { Nullable } from '@/common/types/etc';
import { ChangeDetectionStrategy, Component, inject, OnInit, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormArray, FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormZodMng } from '@/core/paperwork/form_mng/form_zod_mng';
import { SearchBarTxtFieldsRow } from './etc/fragments/txt_fields_row/search-bar-txt-fields-row';
import { SearchBarBtnsRow } from './etc/fragments/btns_row/search-bar-btns-row';
import { LibLog } from '@/core/lib/dev/log';
import { SearchBarFilterBar } from './etc/fragments/filter_bar/search-bar-filter-bar';
import { UseBarsHk } from './etc/hooks/use_bars';
import { UseFiltersHk } from './etc/hooks/use_filters';
import { v4 } from 'uuid';
import { SearchBarSortBar } from './etc/fragments/sort_bar/search-bar-sort-bar';
import { UseSearchbarPropsDir } from './etc/directives/use_search_bar_props';
import { BaseSearchBarFormT } from './etc/paperwork';

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
  providers: [UseBarsHk, UseFiltersHk],
})
export class SearchBar<T> extends UseSearchbarPropsDir<T> implements OnInit {
  // ? listeners
  public onSubmit(): void {
    if (!this.form().valid) {
      FormZodMng.onSubmitFailed(this.form());
      return;
    }
    LibLog.logTtl('✅ submit', this.form().value);
  }

  public readonly onErase: () => void = () => {
    const { txtInputs, ...plainCtrlFields }: BaseSearchBarFormT<T> = this.defState();
    this.form().patchValue(plainCtrlFields);
    const txtInputsFormArray: FormArray = this.form().get('txtInputs') as FormArray;
    txtInputsFormArray.clear();

    for (const f of txtInputs!) txtInputsFormArray.push(new FormControl({ ...f, id: v4() }));
  };

  // ? local state
  public formVal: Nullable<Signal<BaseSearchBarFormT<T>>> = null;
  public readonly useBars: UseBarsHk = inject(UseBarsHk);
  public readonly useFilters: UseFiltersHk = inject(UseFiltersHk);

  ngOnInit(): void {
    this.inCtx(() => {
      this.formVal = toSignal(this.form().valueChanges, {
        initialValue: this.form().value,
      });
    });
  }
}
