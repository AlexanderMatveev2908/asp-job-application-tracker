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
import { UsePlatformSvc } from '@/core/hooks/platform/use_platform';
import { RefDomT, RefTemplateT } from '@/common/types/etc';
import { AppEventMetaT } from '@/core/lib/dom/meta_event/etc/types';
import { PageWrapper } from '@/layout/page_wrapper/page-wrapper';
import { NoticeAnimations } from './etc/animations';
import { NoticeWrapperPropsT } from './etc/types';
import { LinkShadow } from '@/common/components/links/link_shadow/link-shadow';
import { envVars } from '@/environments/environment';
import { SpanEventPropsT } from '@/common/components/els/span/etc/types';

@Component({
  selector: 'app-csr-notice-wrapper',
  imports: [NgComponentOutlet, NgClass, PageWrapper, NgTemplateOutlet, PageWrapper, LinkShadow],
  templateUrl: './csr-notice-wrapper.html',
  styleUrl: './csr-notice-wrapper.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CsrNoticeWrapper implements AfterViewInit {
  private readonly usePlatform: UsePlatformSvc = inject(UsePlatformSvc);

  // ? personal props
  public readonly props: InputSignal<NoticeWrapperPropsT> = input.required();

  // ? mail props link
  public readonly linkProps: SpanEventPropsT = {
    eventT: 'INFO',
    label: 'Open Mail',
    Svg: null,
  };
  public readonly pathProps: string = `https://mail.google.com/mail/u/0/#search/from%3A${envVars.smptFrom.replaceAll(
    '@',
    '%40'
  )}`;

  // ? derived
  public metaEvent: Signal<AppEventMetaT> = computed(() => MetaEventDOM.byT(this.props().eventT));

  // ? children
  @ViewChild('svgWrap') svgWrap: RefDomT;
  @ViewChild('spanMsg') spanMsg: RefDomT;
  @ViewChild('spanStatus') spanStatus: RefDomT;
  @ViewChild('content') content: RefDomT;

  // ? projected
  @ContentChild('header', { read: TemplateRef }) headerTpl: RefTemplateT;
  @ContentChild('footer', { read: TemplateRef }) footerTpl: RefTemplateT;

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
