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
import { RefDomT } from '@/common/types/etc';
import { AppEventMetaT, AppEventPayloadT } from '@/core/hooks/use_event_meta/etc/types';
import { PageWrapper } from '@/layout/page_wrapper/page-wrapper';
import { NoticeAnimations } from './etc/animations';

@Component({
  selector: 'app-csr-notice-wrapper',
  imports: [NgComponentOutlet, NgClass, PageWrapper, NgTemplateOutlet, PageWrapper],
  templateUrl: './csr-notice-wrapper.html',
  styleUrl: './csr-notice-wrapper.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CsrNoticeWrapper implements AfterViewInit {
  private readonly usePlatform: UsePlatformSvc = inject(UsePlatformSvc);

  // ? personal props
  public readonly props: InputSignal<AppEventPayloadT> = input.required<AppEventPayloadT>();

  // ? derived
  public metaEvent: Signal<AppEventMetaT> = computed(() =>
    UseEventMeta.getByT(this.props().eventT)
  );

  // ? children
  @ViewChild('svgWrap') svgWrap: RefDomT;
  @ViewChild('spanMsg') spanMsg: RefDomT;
  @ViewChild('spanStatus') spanStatus: RefDomT;
  @ViewChild('content') content: RefDomT;

  // ? projected
  @ContentChild('header', { read: TemplateRef }) headerTpl?: TemplateRef<unknown>;
  @ContentChild('footer', { read: TemplateRef }) footerTpl?: TemplateRef<unknown>;

  // ? animations
  ngAfterViewInit(): void {
    if (!this.usePlatform.isClient) return;

    NoticeAnimations.main({
      content: this.content,
      spanMsg: this.spanMsg,
      spanStatus: this.spanStatus,
      svgWrap: this.svgWrap,
    });
  }
}
