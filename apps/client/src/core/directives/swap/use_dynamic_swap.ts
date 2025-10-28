import { WithIdT } from '@/common/types/etc';
import { SwapStateT } from '@/core/hooks/swap/etc/types';
import { Directive, input, InputSignal } from '@angular/core';

export interface SwapBoxT extends WithIdT {
  label: string;
  val: string;
}

@Directive({
  selector: '[appUseDynamicSwapDir]',
})
export class UseDynamicSwapDir {
  public readonly swapState: InputSignal<SwapStateT> = input.required();
  public readonly fields: InputSignal<SwapBoxT[]> = input.required();
}
