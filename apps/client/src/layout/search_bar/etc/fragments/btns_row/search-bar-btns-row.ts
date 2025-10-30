import { SpanEventPropsT } from '@/common/components/els/span/etc/types';
import { SvgFillSort } from '@/common/components/svgs/fill/sort/sort';
import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';
import { SearchBarBtnShape } from '../../components/btn_shape/search-bar-btn-shape';
import { UseSpanDir } from '@/core/directives/use_span';
import { SvgStrokeFilter } from '@/common/components/svgs/stroke/filter/filter';
import { SvgStrokeSearch } from '@/common/components/svgs/stroke/search/search';
import { SvgFillErase } from '@/common/components/svgs/fill/erase/erase';

@Component({
  selector: 'app-search-bar-btns-row',
  imports: [SearchBarBtnShape, UseSpanDir],
  templateUrl: './search-bar-btns-row.html',
  styleUrl: './search-bar-btns-row.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBarBtnsRow {
  // ? personal props
  public readonly onErase: InputSignal<() => void> = input.required();

  // ? props btns
  public readonly sortBtn: SpanEventPropsT = {
    eventT: 'INFO',
    label: 'Sort',
    Svg: SvgFillSort,
  };
  public readonly filterBtn: SpanEventPropsT = {
    eventT: 'INFO',
    label: 'Filter',
    Svg: SvgStrokeFilter,
  };
  public readonly searchBtn: SpanEventPropsT = {
    eventT: 'OK',
    label: 'Search',
    Svg: SvgStrokeSearch,
  };
  public readonly eraseBtn: SpanEventPropsT = {
    eventT: 'ERR',
    label: 'Erase',
    Svg: SvgFillErase,
  };
}
