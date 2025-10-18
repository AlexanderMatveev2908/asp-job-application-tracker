import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  InputSignal,
  Signal,
} from '@angular/core';
import { UseEventMeta } from '@/core/hooks/use_event_meta/use_event_meta';
import { Span } from '../../els/span/span';
import { WrapBtnApi } from '../../hoc/btns/wrap_btn_api/wrap-btn-api';
import { WrapBtnApiPropsT } from '../../hoc/btns/wrap_btn_api/etc/types';
import { AppEventMetaT } from '@/core/hooks/use_event_meta/etc/types';
import { BtnListenersT, BtnStatePropsT, BtnT, SpanEventPropsT } from '@/common/types/etc';

@Component({
  selector: 'app-btn-shadow',
  imports: [Span, WrapBtnApi],
  templateUrl: './btn-shadow.html',
  styleUrl: './btn-shadow.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BtnShadow {
  public readonly spanProps: InputSignal<SpanEventPropsT> = input.required();
  public readonly btnProps: InputSignal<BtnStatePropsT> = input.required();
  public readonly eventsProps: InputSignal<BtnListenersT | null> = input<BtnListenersT | null>(
    null
  );
  public readonly type: InputSignal<BtnT> = input<BtnT>('button');

  public readonly metaEvents: Signal<AppEventMetaT> = computed(() =>
    UseEventMeta.getByT(this.spanProps().eventT)
  );

  public readonly wrapBtnApiProps: Signal<WrapBtnApiPropsT> = computed(() => ({
    eventT: this.spanProps().eventT,
    isPending: this.btnProps().isPending,
  }));

  public onClick(): (() => void) | null {
    const clickEvent = this.eventsProps()?.onClick;

    return clickEvent ?? null;
  }
}
