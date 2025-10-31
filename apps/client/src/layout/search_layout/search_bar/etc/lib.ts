import { BaseSearchBarFormT } from './paperwork';
import { SearchQueryArgT } from './types';

export class LibSearchBar {
  public static flatSearchForm<T>(arg: BaseSearchBarFormT<T>): SearchQueryArgT {
    const flatten: SearchQueryArgT = {} as SearchQueryArgT;
    for (const k in arg) {
      if (k === 'txtInputs') continue;
      flatten[k] = arg[k as keyof typeof arg];
    }

    if (arg.txtInputs?.length) for (const f of arg.txtInputs) flatten[f.name] = f.val;

    return flatten;
  }
}
