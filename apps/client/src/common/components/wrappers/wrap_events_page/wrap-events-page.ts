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
import { AppEventMeta } from '../../../types/events';
import { isPlatformBrowser, NgClass, NgComponentOutlet } from '@angular/common';
import { animate, AnimationOptionsWithOverrides } from '@motionone/dom';
import { UseAppEventsSvc } from '../../../../core/hooks/use_app_events';
import { WrapEventsConfT } from './etc/types';

@Component({
  selector: 'app-wrap-events-page',
  imports: [NgComponentOutlet, NgClass],
  templateUrl: './wrap-events-page.html',
  styleUrl: './wrap-events-page.scss',
})
export class WrapEventsPage implements AfterViewInit {
  private readonly platformID = inject(PLATFORM_ID);
  private readonly useAppEvents = inject(UseAppEventsSvc);

  public readonly conf = input.required<WrapEventsConfT>();
  public metaEvent = computed((): AppEventMeta => this.useAppEvents.getByT(this.conf().eventT));

  @ViewChild('svgWrap') svgWrap!: ElementRef<HTMLElement>;
  @ViewChild('spanMsg') spanMsg!: ElementRef<HTMLElement>;
  @ViewChild('spanStatus') spanStatus!: ElementRef<HTMLElement>;
  @ViewChild('content') content!: ElementRef<HTMLElement>;

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformID)) return;

    const svgDOM = this.svgWrap.nativeElement;
    const spanMsgDOM = this.spanMsg.nativeElement;
    const spanStatusDOM = this.spanStatus.nativeElement;
    const contentDOM = this.content.nativeElement;

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

    const cmnConf: AnimationOptionsWithOverrides = {
      delay: 0.2,
      duration: 1,
      easing: 'ease-in-out',
    };

    animate(
      spanMsgDOM,
      {
        x: ['-100%', '40%', '-40%', '20%', '-20%', '10%', '0'],
      },
      cmnConf
    );

    animate(
      spanStatusDOM,
      {
        x: ['100%', '-40%', '40%', '-20%', '20%', '-10%', '0'],
      },
      cmnConf
    );

    animate(
      contentDOM,
      {
        opacity: [0, 1],
      },
      {
        delay: 0.2,
        duration: 0.6,
        easing: 'ease',
      }
    );
  }
}
