/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ContentChild,
  effect,
  EffectRef,
  inject,
  input,
  InputSignal,
  Signal,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { PopupStaticPropsT } from './etc/types';
import { BlackBgPropsT } from '@/layout/black_bg/etc/types';
import { BlackBg } from '@/layout/black_bg/black-bg';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import { UseEventMeta } from '@/core/hooks/use_event_meta/use_event_meta';
import { UsePlatformSvc } from '@/core/hooks/use_platform';
import { AnimationsPopSvc } from './etc/animations';
import { CloseBtn } from '@/common/components/btns/close_btn/close-btn';
import { ElDomT, RefDomT } from '@/common/types/etc';
import { AppEventMetaT } from '@/core/hooks/use_event_meta/etc/types';

@Component({
  selector: 'app-popup',
  imports: [BlackBg, NgClass, CloseBtn, NgTemplateOutlet],
  templateUrl: './popup.html',
  styleUrl: './popup.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Popup {
  // ? svc
  private readonly usePlatform: UsePlatformSvc = inject(UsePlatformSvc);
  private readonly animationsPop: AnimationsPopSvc = inject(AnimationsPopSvc);

  // ? personal props
  public readonly staticProps: InputSignal<PopupStaticPropsT> = input.required();
  public readonly isPop: InputSignal<boolean | null> = input.required();

  // ? black bg overlay props
  public blackBgProps: Signal<BlackBgPropsT> = computed(() => ({
    zBg: `z__${this.staticProps().cls}__bg`,
    isDark: this.isPop(),
  }));

  // ? derived
  public readonly eventMeta: Signal<AppEventMetaT> = computed(() =>
    UseEventMeta.getByT(this.staticProps().eventT)
  );
  public cssZ: Signal<string> = computed(() => `z__${this.staticProps().cls}`);

  // ? children
  @ViewChild('popup') popup: RefDomT;
  @ContentChild('popContent', { read: TemplateRef }) popContentTpl!: TemplateRef<any>;

  // ? listeners
  public animationsEff: EffectRef = effect(() => {
    const isPop = this.isPop();
    const popDOM: ElDomT = this.popup?.nativeElement;

    if (!popDOM) return;

    this.usePlatform.onClient(() => {
      if (isPop) this.animationsPop.popIn(popDOM);
      else if (!isPop && isPop !== null) this.animationsPop.popOut(popDOM);
    });
  });
}
