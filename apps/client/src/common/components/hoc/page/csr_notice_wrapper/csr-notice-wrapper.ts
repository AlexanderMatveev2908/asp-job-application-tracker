import { NgClass, NgComponentOutlet, NgTemplateOutlet } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  ContentChild,
  inject,
  input,
  InputSignal,
  Signal,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { UseEventMeta } from '@/core/hooks/use_event_meta/use_event_meta';
import { UsePlatformSvc } from '@/core/hooks/use_platform';
import { ElDomT, RefDomT } from '@/common/types/etc';
import { animate, AnimationOptionsWithOverrides } from '@motionone/dom';
import { AppEventMetaT, AppEventPayloadT } from '@/core/hooks/use_event_meta/etc/types';
import { PageWrapper } from '@/layout/page_wrapper/page-wrapper';

@Component({
  selector: 'app-csr-notice-wrapper',
  imports: [NgComponentOutlet, NgClass, PageWrapper, NgTemplateOutlet, PageWrapper],
  templateUrl: './csr-notice-wrapper.html',
  styleUrl: './csr-notice-wrapper.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CsrNoticeWrapper implements AfterViewInit {
  private readonly usePlatform: UsePlatformSvc = inject(UsePlatformSvc);

  public readonly props: InputSignal<AppEventPayloadT> = input.required<AppEventPayloadT>();
  public metaEvent: Signal<AppEventMetaT> = computed(() =>
    UseEventMeta.getByT(this.props().eventT)
  );

  @ViewChild('svgWrap') svgWrap: RefDomT;
  @ViewChild('spanMsg') spanMsg: RefDomT;
  @ViewChild('spanStatus') spanStatus: RefDomT;
  @ViewChild('content') content: RefDomT;

  @ContentChild('header', { read: TemplateRef }) headerTpl?: TemplateRef<unknown>;
  @ContentChild('footer', { read: TemplateRef }) footerTpl?: TemplateRef<unknown>;

  ngAfterViewInit(): void {
    if (!this.usePlatform.isClient) return;

    const svgDOM: ElDomT = this.svgWrap?.nativeElement;
    const spanMsgDOM: ElDomT = this.spanMsg?.nativeElement;
    const spanStatusDOM: ElDomT = this.spanStatus?.nativeElement;
    const contentDOM: ElDomT = this.content?.nativeElement;

    if ([svgDOM, spanMsgDOM, spanStatusDOM, contentDOM].some((el: ElDomT) => !el)) return;

    animate(
      svgDOM!,
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
      spanMsgDOM!,
      {
        x: baseFlow,
      },
      cmnConf
    );

    animate(
      spanStatusDOM!,
      {
        x: reverseFlow,
      },
      cmnConf
    );

    animate(
      contentDOM!,
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
