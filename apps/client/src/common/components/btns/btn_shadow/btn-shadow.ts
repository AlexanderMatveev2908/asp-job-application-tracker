import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  InputSignal,
  Signal,
} from '@angular/core';
import { UseAppEvSvc } from '@/core/hooks/use_app_ev';
import { AppEventMeta } from '@/common/types/events';
import { Span } from '../../els/span/span';
import { BtnEvPropsT, BtnStatePropsT, BtnT } from '@/common/types/btns';
import { SpanEventPropsT } from '@/common/types/els';
import { WrapBtnApi } from '../../hoc/btns/wrap_btn_api/wrap-btn-api';
import { WrapBtnApiPropsT } from '../../hoc/btns/wrap_btn_api/etc/types';

@Component({
  selector: 'app-btn-shadow',
  imports: [Span, WrapBtnApi],
  templateUrl: './btn-shadow.html',
  styleUrl: './btn-shadow.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BtnShadow {
  private readonly useAppEvents: UseAppEvSvc = inject(UseAppEvSvc);

  public readonly spanProps: InputSignal<SpanEventPropsT> = input.required();
  public readonly btnProps: InputSignal<BtnStatePropsT> = input.required();
  public readonly eventsProps: InputSignal<BtnEvPropsT | null> = input<BtnEvPropsT | null>(null);
  public readonly type: InputSignal<BtnT> = input<BtnT>('button');

  public readonly metaEvents: Signal<AppEventMeta> = computed(() =>
    this.useAppEvents.getByT(this.spanProps().eventT)
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
