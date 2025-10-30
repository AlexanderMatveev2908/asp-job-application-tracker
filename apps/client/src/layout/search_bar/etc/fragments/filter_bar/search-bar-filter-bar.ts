import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  InputSignal,
  Signal,
} from '@angular/core';
import { UseBarsHk } from '../../hooks/use_bars';
import { BlackBgPropsT } from '@/layout/black_bg/etc/types';
import { BlackBg } from '@/layout/black_bg/black-bg';

@Component({
  selector: 'app-search-bar-filter-bar',
  imports: [BlackBg],
  templateUrl: './search-bar-filter-bar.html',
  styleUrl: './search-bar-filter-bar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBarFilterBar {
  public readonly useBars: InputSignal<UseBarsHk> = input.required();

  // ? black bg
  public readonly blackBgProps: Signal<BlackBgPropsT> = computed(
    (): BlackBgPropsT => ({
      isDark: this.useBars().isFilterBar(),
      zBg: 'z__search_bar__bg',
    })
  );
}
