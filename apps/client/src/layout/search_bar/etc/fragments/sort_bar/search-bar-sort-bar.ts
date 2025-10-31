import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';
import { Popup } from '@/layout/popup/popup';
import { PopupStaticPropsT } from '@/layout/popup/etc/types';
import { UseIDsDir } from '@/core/directives/use_ids';
import { UseBarsHk } from '../../hooks/use_bars';
import { SearchBarSorterT } from '../../ui_fkt';

@Component({
  selector: 'app-search-bar-sort-bar',
  imports: [Popup, UseIDsDir],
  templateUrl: './search-bar-sort-bar.html',
  styleUrl: './search-bar-sort-bar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBarSortBar {
  public readonly useBars: InputSignal<UseBarsHk> = input.required();
  public readonly sortersAvailable: InputSignal<() => SearchBarSorterT[]> = input.required();

  // ? app-popup props
  public readonly staticProps: PopupStaticPropsT = {
    closeOnMouseOut: true,
    cls: 'generic_popup',
    eventT: 'INFO',
    closePop: () => this.useBars().isSortBar.set(false),
  };
}
