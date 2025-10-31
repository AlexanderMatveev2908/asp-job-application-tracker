import { Directive, input, InputSignal } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseSearchBarFormT } from '../paperwork';
import { TxtFieldArrayT } from '@/common/types/forms';
import { SearchBarFilterT, SearchBarSorterT } from '../ui_fkt';
import { UseInjCtxHk } from '@/core/hooks/use_inj_ctx';
import { Nullable } from '@/common/types/etc';
import { UsePaginationHk } from '@/core/hooks/use_pagination';

@Directive()
export abstract class UseSearchbarPropsDir<T> extends UseInjCtxHk {
  // ? props
  public readonly defState: InputSignal<BaseSearchBarFormT<T>> = input.required();
  public readonly form: InputSignal<FormGroup> = input.required();
  public readonly txtInputsAvailable: InputSignal<() => TxtFieldArrayT[]> = input.required();
  public readonly filtersAvailable: InputSignal<() => SearchBarFilterT[]> = input.required();
  public readonly sortersAvailable: InputSignal<() => SearchBarSorterT[]> = input.required();

  // ? page related
  public readonly totPages: InputSignal<Nullable<number>> = input.required();
  public readonly usePagination: InputSignal<UsePaginationHk> = input.required();
}
