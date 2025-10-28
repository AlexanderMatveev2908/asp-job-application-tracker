import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  HostListener,
  input,
  InputSignal,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { PaginationSwapStateT, SwapStateT } from '@/core/hooks/swap/etc/types';
import { CheckBoxFieldT } from '@/common/types/forms';
import { SwapDOM } from '@/core/lib/dom/swap';
import { UseInjCtxHk } from '@/core/hooks/use_inj_ctx';
import { v4 } from 'uuid';
import { DynamicSwapItem } from './dynamic_swap_item/dynamic-swap-item';

@Component({
  selector: 'app-dynamic-swapper',
  imports: [DynamicSwapItem],
  templateUrl: './dynamic-swapper.html',
  styleUrl: './dynamic-swapper.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicSwapper extends UseInjCtxHk implements AfterViewInit {
  public readonly swapState: InputSignal<SwapStateT> = input.required();
  public readonly fields: InputSignal<CheckBoxFieldT[]> = input.required();
  public readonly paginationState: WritableSignal<PaginationSwapStateT> = signal({
    colsForSwap: 1,
    rowsForCol: 3,
    swapsIDs: [v4()],
  });

  public readonly gridConf: Signal<string> = computed(
    () => `repeat(${this.paginationState().swapsIDs.length}, 100%)`
  );
  public getItems(currSwap: number): CheckBoxFieldT[] {
    const { colsForSwap, rowsForCol } = this.paginationState();
    const itemsForSwap: number = colsForSwap * rowsForCol;

    return SwapDOM.getItemsSwap(this.fields(), currSwap, itemsForSwap);
  }

  ngAfterViewInit(): void {
    this.usePlatform.onClient(() => {
      this.paginationState.set(SwapDOM.freshState(this.fields().length));
    });
  }

  @HostListener('window:resize')
  public onResize(): void {
    this.paginationState.set(SwapDOM.freshState(this.fields().length));

    console.log(this.paginationState());
  }
}
