import { AppEventMetaT, AppEventT } from '@/core/hooks/use_event_meta/etc/types';
import { UseEventMeta } from '@/core/hooks/use_event_meta/use_event_meta';
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
  public readonly isHover: InputSignal<boolean> = input.required();
  public readonly msg: InputSignal<string | null> = input.required();
  public readonly eventT: InputSignal<AppEventT> = input.required();

  public readonly twd: Signal<string> = computed(() =>
    this.isHover() && this.msg() ? 'translate-y-[-20px] opacity-1' : 'translate-y-[100%] opacity-0'
  );
  public readonly eventMeta: Signal<AppEventMetaT> = computed(() =>
    UseEventMeta.getByT(this.eventT())
  );
}
