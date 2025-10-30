import { SpanEventPropsT } from '@/common/components/els/span/etc/types';
import { SvgFillErase } from '@/common/components/svgs/fill/erase/erase';
import { SvgFillSort } from '@/common/components/svgs/fill/sort/sort';
import { SvgStrokeFilter } from '@/common/components/svgs/stroke/filter/filter';
import { SvgStrokeSearch } from '@/common/components/svgs/stroke/search/search';
import { CheckBoxFieldT } from '@/common/types/forms';
import { Type } from '@angular/core';

export interface SearchBarFilterT {
  id: string;
  field: string;
  label: string;
  Svg: Type<unknown>;
  fields: CheckBoxFieldT[];
}

export type SearchBarBtnKeyT = 'sortBtn' | 'filterBtn' | 'searchBtn' | 'eraseBtn';

export class SearchBarUiFkt {
  public static readonly sortBtn: SpanEventPropsT = {
    eventT: 'INFO',
    label: 'Sort',
    Svg: SvgFillSort,
  };
  public static readonly filterBtn: SpanEventPropsT = {
    eventT: 'INFO',
    label: 'Filter',
    Svg: SvgStrokeFilter,
  };
  public static readonly searchBtn: SpanEventPropsT = {
    eventT: 'OK',
    label: 'Search',
    Svg: SvgStrokeSearch,
  };
  public static readonly eraseBtn: SpanEventPropsT = {
    eventT: 'ERR',
    label: 'Erase',
    Svg: SvgFillErase,
  };

  public static readonly btns: Record<SearchBarBtnKeyT, SpanEventPropsT> = {
    searchBtn: this.searchBtn,
    eraseBtn: this.eraseBtn,
    sortBtn: this.sortBtn,
    filterBtn: this.filterBtn,
  };
}
