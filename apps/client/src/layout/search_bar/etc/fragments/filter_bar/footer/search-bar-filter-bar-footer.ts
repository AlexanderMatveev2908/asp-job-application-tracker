import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';
import { SearchBarBtnShape } from '../../../components/btn_shape/search-bar-btn-shape';
import { SearchBarBtnKeyT, SearchBarUiFkt } from '../../../ui_fkt';
import { SpanEventPropsT } from '@/common/components/els/span/etc/types';
import { UseSpanDir } from '@/core/directives/use_span';

@Component({
  selector: 'app-search-bar-filter-bar-footer',
  imports: [SearchBarBtnShape, UseSpanDir],
  templateUrl: './search-bar-filter-bar-footer.html',
  styleUrl: './search-bar-filter-bar-footer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBarFilterBarFooter {
  public readonly onErase: InputSignal<() => void> = input.required();

  // ? props btns
  public readonly btns: Record<SearchBarBtnKeyT, SpanEventPropsT> = SearchBarUiFkt.btns;
}
