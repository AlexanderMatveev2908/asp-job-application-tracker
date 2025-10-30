import { UseSpanDir } from '@/core/directives/use_span';
import { AppEventMetaT } from '@/core/lib/dom/meta_event/etc/types';
import { MetaEventDOM } from '@/core/lib/dom/meta_event/meta_event';
import { NgComponentOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, Signal } from '@angular/core';

@Component({
  selector: 'app-search-bar-btn-shape',
  imports: [NgComponentOutlet],
  templateUrl: './search-bar-btn-shape.html',
  styleUrl: './search-bar-btn-shape.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBarBtnShape {
  public readonly useSpanDir: UseSpanDir = inject(UseSpanDir);

  // ? derived
  public readonly metaEvent: Signal<AppEventMetaT> = computed(() =>
    MetaEventDOM.byT(this.useSpanDir.spanProps().eventT)
  );
}
