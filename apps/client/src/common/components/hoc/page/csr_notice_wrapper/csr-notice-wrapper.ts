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
import { MetaEventDOM } from '@/core/lib/dom/meta_event/meta_event';
import { UsePlatformSvc } from '@/core/hooks/use_platform';
import { RefDomT, TpltRedT } from '@/common/types/etc';
import { AppEventMetaT, AppEventPayloadT } from '@/core/lib/dom/meta_event/etc/types';
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
  public metaEvent: Signal<AppEventMetaT> = computed(() => MetaEventDOM.byT(this.props().eventT));

  // ? children
  @ViewChild('svgWrap') svgWrap: RefDomT;
  @ViewChild('spanMsg') spanMsg: RefDomT;
  @ViewChild('spanStatus') spanStatus: RefDomT;
  @ViewChild('content') content: RefDomT;

  // ? projected
  @ContentChild('header', { read: TemplateRef }) headerTpl?: TpltRedT;
  @ContentChild('footer', { read: TemplateRef }) footerTpl?: TpltRedT;

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
