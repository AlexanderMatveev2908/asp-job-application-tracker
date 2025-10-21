import { BtnListenersT, BtnStatePropsT, WithIdT } from '@/common/types/etc';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  InputSignal,
  Signal,
} from '@angular/core';
import { BtnShadow } from '../../../btns/btn_shadow/btn-shadow';
import { SwapBtnsUiFkt } from './etc/ui_fkt';
import { SpanEventPropsT } from '@/common/components/els/span/etc/types';
import { Prs } from '@/core/lib/data_structure/prs';

@Component({
  selector: 'app-swap-btns',
  imports: [BtnShadow],
  templateUrl: './swap-btns.html',
  styleUrl: './swap-btns.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwapBtns {
  // ? personal props
  public readonly swap: InputSignal<number> = input.required();
  public readonly setSwap: InputSignal<(val: number) => void> = input.required();
  public readonly maxSwaps: InputSignal<number> = input.required();
  public readonly prefixTestId: InputSignal<string> = input.required();

  // ? app-span props generated
  public readonly spans: (SpanEventPropsT & WithIdT)[] = SwapBtnsUiFkt.getSpansProps();

  // ? dynamic app-btn-shadow props
  public getListeners(idx: number): BtnListenersT {
    return {
      onClick: (): void => {
        const setter = this.setSwap();
        setter(this.swap() + (idx ? 1 : -1));
      },
    };
  }

  // ? props btn shadow
  public getTestId(idx: number): string {
    return Prs.toSnake(this.prefixTestId() + (!idx ? 'prev_swap' : 'next_swap'));
  }

  public getBtnState(idx: number): Signal<BtnStatePropsT> {
    return computed(() => ({
      isDisabled: idx ? this.swap() + 1 >= this.maxSwaps() : !this.swap(),
      isPending: false,
    }));
  }
}
