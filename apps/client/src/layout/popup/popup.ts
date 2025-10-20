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
import { MetaEventDOM } from '@/core/lib/dom/meta_event/meta_event';
import { UsePlatformSvc } from '@/core/hooks/use_platform';
import { AnimationsPopSvc } from './etc/animations';
import { CloseBtn } from '@/common/components/btns/close_btn/close-btn';
import { ElDomT, RefDomT, TpltRedT } from '@/common/types/etc';
import { AppEventMetaT } from '@/core/lib/dom/meta_event/etc/types';

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
    MetaEventDOM.byT(this.staticProps().eventT)
  );
  public cssZ: Signal<string> = computed(() => `z__${this.staticProps().cls}`);

  // ? children
  @ViewChild('popup') popup: RefDomT;
  @ContentChild('popContent', { read: TemplateRef }) popContentTpl!: TpltRedT;

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
