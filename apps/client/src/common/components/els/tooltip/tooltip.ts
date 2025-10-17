import { AppEventMetaT, AppEventT } from '@/common/types/events';
import { UseAppEvSvc } from '@/core/hooks/use_app_ev';
import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
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
  private readonly useAppEvents: UseAppEvSvc = inject(UseAppEvSvc);

  public readonly isHover: InputSignal<boolean> = input.required();
  public readonly msg: InputSignal<string | null> = input.required();
  public readonly eventT: InputSignal<AppEventT> = input.required();

  public readonly twd: Signal<string> = computed(() =>
    this.isHover() && this.msg() ? 'translate-y-[-100%] opacity-1' : 'translate-y-[25px] opacity-0'
  );
  public readonly eventMeta: Signal<AppEventMetaT> = computed(() =>
    this.useAppEvents.getByT(this.eventT())
  );
}
