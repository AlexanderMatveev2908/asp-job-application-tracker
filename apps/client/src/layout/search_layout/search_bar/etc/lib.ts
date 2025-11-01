import { Nullable } from '@/common/types/etc';
import { LibPageCounter } from '../../page_counter/etc/lib';
import { BaseSearchBarFormT } from './paperwork';
import { PaginationArgT, SearchQueryArgT } from './types';
import { LibShapeCheck } from '@/core/lib/data_structure/shape_check';

export class LibSearchBar {
  public static flatSearchForm<T>(arg: Nullable<Partial<BaseSearchBarFormT<T>>>): SearchQueryArgT {
    const flatten: SearchQueryArgT = {} as SearchQueryArgT;

    for (const k in arg) {
      if (k === 'txtInputs') continue;
      flatten[k] = arg[k as keyof typeof arg];
    }

    if (arg?.txtInputs?.length)
      for (const f of arg.txtInputs) {
        if (!LibShapeCheck.isStr(f.val)) continue;

        flatten[f.name] = f.val;
      }

    return flatten;
  }

  public static searchDataOf<T>(
    mainData: Nullable<BaseSearchBarFormT<T>>,
    paginationData?: Partial<PaginationArgT>
  ): SearchQueryArgT {
    const merged: Partial<BaseSearchBarFormT<T>> & PaginationArgT = {
      ...((mainData ?? {}) as Partial<BaseSearchBarFormT<T>>),
      page: paginationData?.page ?? 0,
      limit: paginationData?.limit ?? LibPageCounter.paginationVals.get('limit')!(),
    };

    return this.flatSearchForm(merged);
  }
}
