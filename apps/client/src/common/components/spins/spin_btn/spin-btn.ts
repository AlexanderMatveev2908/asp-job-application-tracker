import { ElDomT, RefDomT } from '@/common/types/etc';
import { AppEventMetaT, AppEventT } from '@/core/lib/dom/meta_event/etc/types';
import { MetaEventDOM } from '@/core/lib/dom/meta_event/meta_event';
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
  private readonly usePlatform: UsePlatformSvc = inject(UsePlatformSvc);

  // ? personal props
  public readonly eventT: InputSignal<AppEventT> = input.required();

  // ? derived
  public readonly metaEvent: Signal<AppEventMetaT> = computed(() =>
    MetaEventDOM.byT(this.eventT())
  );

  // ? static ids to map for spin
  public readonly IDs: string[] = Array.from({ length: 4 }, () => v4());

  // ? children
  @ViewChildren('dot') dots: QueryList<RefDomT> | undefined;

  // ? animations
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
