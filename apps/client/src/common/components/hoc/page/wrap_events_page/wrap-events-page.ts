import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  ContentChild,
  ElementRef,
  inject,
  input,
  InputSignal,
  Signal,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { NgClass, NgComponentOutlet, NgTemplateOutlet } from '@angular/common';
import { animate, AnimationOptionsWithOverrides } from '@motionone/dom';
import { WrapEventsPropsT } from './etc/types';
import { UseAppEvSvc } from '@/core/hooks/use_app_ev';
import { AppEvMeta } from '@/common/types/events';
import { UsePlatformSvc } from '@/core/hooks/use_platform';
import { WrapPage } from '../wrap_page/wrap-page';

@Component({
  selector: 'app-wrap-events-page',
  imports: [NgComponentOutlet, NgClass, WrapPage, NgTemplateOutlet],
  templateUrl: './wrap-events-page.html',
  styleUrl: './wrap-events-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WrapEventsPage implements AfterViewInit {
  private readonly useAppEvents: UseAppEvSvc = inject(UseAppEvSvc);
  private readonly usePlatform: UsePlatformSvc = inject(UsePlatformSvc);

  public readonly props: InputSignal<WrapEventsPropsT> = input.required<WrapEventsPropsT>();
  public metaEvent: Signal<AppEvMeta> = computed(() =>
    this.useAppEvents.getByT(this.props().eventT)
  );

  @ViewChild('svgWrap') svgWrap!: ElementRef<HTMLElement>;
  @ViewChild('spanMsg') spanMsg!: ElementRef<HTMLElement>;
  @ViewChild('spanStatus') spanStatus!: ElementRef<HTMLElement>;
  @ViewChild('content') content!: ElementRef<HTMLElement>;

  @ContentChild('header', { read: TemplateRef }) headerTpl?: TemplateRef<unknown>;
  @ContentChild('footer', { read: TemplateRef }) footerTpl?: TemplateRef<unknown>;

  ngAfterViewInit(): void {
    if (!this.usePlatform.isClient) return;

    const svgDOM = this.svgWrap.nativeElement;
    const spanMsgDOM = this.spanMsg.nativeElement;
    const spanStatusDOM = this.spanStatus.nativeElement;
    const contentDOM = this.content.nativeElement;

    animate(
      svgDOM,
      {
        // eslint-disable-next-line no-magic-numbers
        scaleX: [0, 1.6, 0.6, 1.3, 0.9, 1.05, 1],
        // eslint-disable-next-line no-magic-numbers
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

    const baseFlow: string[] = ['-100%', '40%', '-40%', '20%', '-20%', '10%', '0'];
    const reverseFlow: string[] = baseFlow.map((el: string) =>
      el.startsWith('-') ? el.replace('-', '') : '-' + el
    );

    animate(
      spanMsgDOM,
      {
        x: baseFlow,
      },
      cmnConf
    );

    animate(
      spanStatusDOM,
      {
        x: reverseFlow,
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
