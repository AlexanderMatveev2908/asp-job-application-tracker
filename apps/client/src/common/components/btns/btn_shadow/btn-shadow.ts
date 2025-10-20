import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  InputSignal,
  Signal,
} from '@angular/core';
import { MetaEventDOM } from '@/core/lib/dom/meta_event/meta_event';
import { Span } from '../../els/span/span';
import { WrapBtnApi } from '../../hoc/btns/wrap_btn_api/wrap-btn-api';
import { WrapBtnApiPropsT } from '../../hoc/btns/wrap_btn_api/etc/types';
import { AppEventMetaT } from '@/core/lib/dom/meta_event/etc/types';
import { BtnListenersT, BtnStatePropsT, BtnT, Nullable } from '@/common/types/etc';
import { SpanEventPropsT, SpanSizesPropsT } from '../../els/span/etc/types';

@Component({
  selector: 'app-btn-shadow',
  imports: [Span, WrapBtnApi],
  templateUrl: './btn-shadow.html',
  styleUrl: './btn-shadow.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BtnShadow {
  // ? app-span component props
  public readonly spanProps: InputSignal<SpanEventPropsT> = input.required();
  public readonly spanSizesProps: InputSignal<Partial<SpanSizesPropsT>> = input<
    Partial<SpanSizesPropsT>
  >({
    svg: 'sm',
    txt: 'lg',
  });
  // ? btn personal props
  public readonly btnStateProps: InputSignal<BtnStatePropsT> = input<BtnStatePropsT>({
    isDisabled: false,
    isPending: false,
  });
  public readonly listenersProps: InputSignal<Nullable<BtnListenersT>> =
    input<Nullable<BtnListenersT>>(null);
  public readonly type: InputSignal<BtnT> = input<BtnT>('button');
  public readonly paddingProps: InputSignal<string> = input('10px 15px');
  public readonly testId: InputSignal<Nullable<string>> = input<Nullable<string>>(null);

  // ? derived from eventT span props
  public readonly metaEvents: Signal<AppEventMetaT> = computed(() =>
    MetaEventDOM.byT(this.spanProps().eventT)
  );

  // ? app-wrap-api component props
  public readonly wrapBtnApiProps: Signal<WrapBtnApiPropsT> = computed(() => ({
    eventT: this.spanProps().eventT,
    isPending: this.btnStateProps().isPending,
  }));

  public async onClick(): Promise<void> {
    const clickEvent = this.listenersProps()?.onClick;
    if (!clickEvent) return;

    const res: void | Promise<void> = clickEvent();
    if (res instanceof Promise) await res;
  }
}
