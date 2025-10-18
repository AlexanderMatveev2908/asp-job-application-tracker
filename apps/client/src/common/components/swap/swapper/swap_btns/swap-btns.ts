import { BtnListenersT, BtnStatePropsT, SpanEventPropsT, WithIdT } from '@/common/types/etc';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  InputSignal,
  Signal,
} from '@angular/core';
import { BtnShadow } from '../../../btns/btn_shadow/btn-shadow';
import { SpansSwap } from './etc/spans';

@Component({
  selector: 'app-swap-btns',
  imports: [BtnShadow],
  templateUrl: './swap-btns.html',
  styleUrl: './swap-btns.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwapBtns {
  public readonly swap: InputSignal<number> = input.required();
  public readonly setSwap: InputSignal<(val: number) => void> = input.required();
  public readonly maxSwaps: InputSignal<number> = input.required();

  public readonly spans: (SpanEventPropsT & WithIdT)[] = SpansSwap.getSpansProps();

  public getListeners(idx: number): BtnListenersT {
    return {
      onClick: (): void => {
        const setter = this.setSwap();
        setter(this.swap() + (idx ? 1 : -1));
      },
    };
  }

  public getBtnState(idx: number): Signal<BtnStatePropsT> {
    return computed(() => ({
      isDisabled: idx ? this.swap() + 1 >= this.maxSwaps() : !this.swap(),
      isPending: false,
    }));
  }
}
