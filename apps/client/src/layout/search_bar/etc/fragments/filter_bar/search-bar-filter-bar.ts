import {
  ChangeDetectionStrategy,
  Component,
  computed,
  HostListener,
  input,
  InputSignal,
  Signal,
  ViewChild,
} from '@angular/core';
import { UseBarsHk } from '../../hooks/use_bars';
import { BlackBgPropsT } from '@/layout/black_bg/etc/types';
import { BlackBg } from '@/layout/black_bg/black-bg';
import { NgClass } from '@angular/common';
import { ElDomT, RefDomT } from '@/common/types/etc';

@Component({
  selector: 'app-search-bar-filter-bar',
  imports: [BlackBg, NgClass],
  templateUrl: './search-bar-filter-bar.html',
  styleUrl: './search-bar-filter-bar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBarFilterBar {
  public readonly useBars: InputSignal<UseBarsHk> = input.required();

  // ? derived
  public readonly twd: Signal<string> = computed(() =>
    this.useBars().isFilterBar() ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
  );

  // ? children
  @ViewChild('barRef')
  public barRef: RefDomT;

  // ? black bg props
  public readonly blackBgProps: Signal<BlackBgPropsT> = computed(
    (): BlackBgPropsT => ({
      isDark: this.useBars().isFilterBar(),
      zBg: 'z__search_bar__bg',
    })
  );

  // ? listeners
  @HostListener('document:mousedown', ['$event'])
  public onMouseDown(e: Event): void {
    const bar: ElDomT = this.barRef?.nativeElement;
    const target: Node = e.target as Node;

    if ([bar, target].some((el: ElDomT | Node) => !el)) return;

    if (this.useBars().isFilterBar() && !bar!.contains(target))
      this.useBars().isFilterBar.set(false);
  }
}
