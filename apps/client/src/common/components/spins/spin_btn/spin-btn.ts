import { ElDomT, RefDomT } from '@/common/types/etc';
import { AppEventMetaT, AppEventT } from '@/common/types/events';
import { UseEventMeta } from '@/core/hooks/use_event_meta';
import { UsePlatformSvc } from '@/core/hooks/use_platform';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  InputSignal,
  QueryList,
  Signal,
  ViewChildren,
} from '@angular/core';
import { animate } from '@motionone/dom';
import { v4 } from 'uuid';

@Component({
  selector: 'app-spin-btn',
  imports: [],
  templateUrl: './spin-btn.html',
  styleUrl: './spin-btn.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinBtn implements AfterViewInit {
  public readonly eventT: InputSignal<AppEventT> = input.required();
  private readonly usePlatform: UsePlatformSvc = inject(UsePlatformSvc);

  public readonly metaEvent: Signal<AppEventMetaT> = computed(() =>
    UseEventMeta.getByT(this.eventT())
  );

  public readonly IDs: string[] = Array.from({ length: 4 }, () => v4());

  @ViewChildren('dot') dots: QueryList<RefDomT> | undefined;

  ngAfterViewInit(): void {
    if (!this.usePlatform.isClient) return;

    if (!this.dots) return;

    const dotsDOM = this.dots.toArray();

    for (let i = 0; i < dotsDOM.length; i++) {
      const curr: RefDomT = dotsDOM[i];
      const currDOM: ElDomT = curr?.nativeElement;

      if (!currDOM) return;

      animate(
        currDOM,
        // eslint-disable-next-line no-magic-numbers
        { scale: [1, 1.25, 1], y: [0, 35, 0] },
        {
          duration: 1,
          delay: (i * 1) / dotsDOM.length,
          easing: 'ease-in-out',
          repeat: Infinity,
        }
      );
    }
  }
}
