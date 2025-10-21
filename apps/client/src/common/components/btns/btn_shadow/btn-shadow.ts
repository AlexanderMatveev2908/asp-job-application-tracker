import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';
import { Span } from '../../els/span/span';
import { WrapBtnApi } from '../../hoc/btns/wrap_btn_api/wrap-btn-api';
import { BtnListenersT, BtnStatePropsT, BtnT, Nullable } from '@/common/types/etc';
import { UseMetaSpanDir } from '@/core/directives/span/1.use_span_meta';

@Component({
  selector: 'app-btn-shadow',
  imports: [Span, WrapBtnApi],
  templateUrl: './btn-shadow.html',
  styleUrl: './btn-shadow.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BtnShadow extends UseMetaSpanDir {
  // ? btn personal props
  public readonly btnStateProps: InputSignal<BtnStatePropsT> = input<BtnStatePropsT>({
    isDisabled: false,
    isPending: false,
  });
  public readonly listenersProps: InputSignal<Nullable<BtnListenersT>> =
    input<Nullable<BtnListenersT>>(null);
  public readonly type: InputSignal<BtnT> = input<BtnT>('button');

  public async onClick(): Promise<void> {
    const clickEvent = this.listenersProps()?.onClick;
    if (!clickEvent) return;

    const res: void | Promise<void> = clickEvent();
    if (res instanceof Promise) await res;
  }
}
