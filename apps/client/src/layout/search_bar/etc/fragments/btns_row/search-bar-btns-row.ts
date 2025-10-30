import { SpanEventPropsT } from '@/common/components/els/span/etc/types';
import { SvgFillSort } from '@/common/components/svgs/fill/sort/sort';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SearchBarBtnShape } from '../../components/btn_shape/search-bar-btn-shape';
import { UseSpanDir } from '@/core/directives/use_span';
import { SvgStrokeFilter } from '@/common/components/svgs/stroke/filter/filter';

@Component({
  selector: 'app-search-bar-btns-row',
  imports: [SearchBarBtnShape, UseSpanDir],
  templateUrl: './search-bar-btns-row.html',
  styleUrl: './search-bar-btns-row.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBarBtnsRow {
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
}
