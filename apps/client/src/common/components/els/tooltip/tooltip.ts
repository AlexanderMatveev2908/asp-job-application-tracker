import { Nullable } from '@/common/types/etc';
import { AppEventMetaT, AppEventT } from '@/core/lib/dom/meta_event/etc/types';
import { MetaEventDOM } from '@/core/lib/dom/meta_event/meta_event';
import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  InputSignal,
  Signal,
} from '@angular/core';

@Component({
  selector: 'app-tooltip',
  imports: [NgClass],
  templateUrl: './tooltip.html',
  styleUrl: './tooltip.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Tooltip {
  // ? personal props
  public readonly isHover: InputSignal<boolean> = input.required();
  public readonly msg: InputSignal<Nullable<string>> = input.required();
  public readonly eventT: InputSignal<AppEventT> = input.required();

  // ? derived
  public readonly twd: Signal<string> = computed(() =>
    this.isHover() && this.msg() ? 'translate-y-[-20px] opacity-1' : 'translate-y-[100%] opacity-0'
  );
  public readonly eventMeta: Signal<AppEventMetaT> = computed(() =>
    MetaEventDOM.byT(this.eventT())
  );
}
