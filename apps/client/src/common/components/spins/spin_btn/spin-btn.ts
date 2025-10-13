import { AppEvMeta, AppEvT } from '@/common/types/events';
import { UseAppEvSvc } from '@/core/hooks/use_app_ev';
import { UsePlatformSvc } from '@/core/hooks/use_platform';
import {
  AfterViewInit,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { animate } from '@motionone/dom';
import { v4 } from 'uuid';

@Component({
  selector: 'app-spin-btn',
  imports: [],
  templateUrl: './spin-btn.html',
  styleUrl: './spin-btn.scss',
})
export class SpinBtn implements AfterViewInit {
  private readonly useAppEvents = inject(UseAppEvSvc);
  public readonly eventT = input.required<AppEvT>();
  private readonly usePlatform = inject(UsePlatformSvc);

  public readonly metaEvent = computed<AppEvMeta>(() => this.useAppEvents.getByT(this.eventT()));

  public readonly IDs = Array.from({ length: 4 }, () => v4());

  @ViewChildren('dot') dots!: QueryList<ElementRef<HTMLDivElement>>;

  ngAfterViewInit(): void {
    if (!this.usePlatform.isClient) return;

    const dots = this.dots.toArray();

    for (let i = 0; i < dots.length; i++) {
      const curr = dots[i];

      animate(
        curr.nativeElement,
        { scale: [1, 1.25, 1], y: [0, 35, 0] },
        {
          duration: 1,
          delay: (i * 1) / dots.length,
          easing: 'ease-in-out',
          repeat: Infinity,
        }
      );
    }
  }
}
