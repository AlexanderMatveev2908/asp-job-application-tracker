import {
  AfterViewInit,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { AppEvent, AppEventMeta, AppEventT } from '../../../types/events';
import { isPlatformBrowser, NgClass, NgComponentOutlet } from '@angular/common';
import { animate } from '@motionone/dom';

@Component({
  selector: 'app-wrap-events-page',
  imports: [NgComponentOutlet, NgClass],
  templateUrl: './wrap-events-page.html',
  styleUrl: './wrap-events-page.scss',
})
export class WrapEventsPage implements AfterViewInit {
  private readonly platformID = inject(PLATFORM_ID);

  public eventT = input.required<AppEventT>();
  public metaEvent = computed((): AppEventMeta => AppEvent[this.eventT()]);
  public msg = input.required<string>();

  @ViewChild('svgWrap') svgWrap!: ElementRef<HTMLElement>;
  @ViewChild('spanMsg') spanMsg!: ElementRef<HTMLElement>;

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformID)) return;

    const svgDOM = this.svgWrap.nativeElement;
    const spanDOM = this.spanMsg.nativeElement;

    animate(
      svgDOM,
      {
        scaleX: [0, 1.6, 0.6, 1.3, 0.9, 1.05, 1],
        scaleY: [0, 0.4, 1.4, 0.7, 1.2, 0.95, 1],
      },
      {
        duration: 1,
        easing: 'ease-out',
      }
    );

    animate(
      spanDOM,
      {
        x: ['-100%', '40%', '-40%', '20%', '-20%', '10%', '0'],
        opacity: [0, 1],
      },
      {
        delay: 0.2,
        duration: 1,
        easing: 'ease-in-out',
      }
    );
  }
}
