import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  InputSignal,
  Signal,
} from '@angular/core';
import { Span } from '../../els/span/span';
import { WrapBtnApi } from '../../hoc/btns/wrap_btn_api/wrap-btn-api';
import { WrapBtnApiPropsT } from '../../hoc/btns/wrap_btn_api/etc/types';
import { BtnListenersT, BtnStatePropsT, BtnT, Nullable } from '@/common/types/etc';
import { UseSpanDir } from '@/core/directives/span/use_span';

@Component({
  selector: 'app-btn-shadow',
  imports: [Span, WrapBtnApi],
  templateUrl: './btn-shadow.html',
  styleUrl: './btn-shadow.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BtnShadow extends UseSpanDir {
  // ? btn personal props
  public readonly btnStateProps: InputSignal<BtnStatePropsT> = input<BtnStatePropsT>({
    isDisabled: false,
    isPending: false,
  });
  public readonly listenersProps: InputSignal<Nullable<BtnListenersT>> =
    input<Nullable<BtnListenersT>>(null);
  public readonly type: InputSignal<BtnT> = input<BtnT>('button');

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
