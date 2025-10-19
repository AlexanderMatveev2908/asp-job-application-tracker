import { computed, Directive, Signal, signal, WritableSignal } from '@angular/core';
import { ConfSwapT, SwapStateT } from './etc/types';
import { LibEtc } from '@/core/lib/etc';

@Directive()
export abstract class WithSwap {
  public readonly swapState: WritableSignal<SwapStateT> = signal({
    mode: null,
    swap: 0,
  });

  protected timerID: NodeJS.Timeout | null = null;

  protected clearTmr(): void {
    this.timerID = LibEtc.clearTmrID(this.timerID);
  }

  public readonly setSwap: (val: number) => void = (val: number) => {
    const TIME_ANIMATION: number = 500;
    this.clearTmr();

    this.swapState.update((prev: SwapStateT) => ({ ...prev, mode: 'swapping', swap: val }));

    this.timerID = setTimeout(() => {
      if (this.timerID && this.swapState().mode === 'swapping')
        this.swapState.update((prev: SwapStateT) => ({ ...prev, mode: 'swapped' }));

      this.clearTmr();
    }, TIME_ANIMATION);
  };

  public readonly confSwap: (idx: number) => Signal<ConfSwapT> = (idx: number) =>
    computed(() => {
      const state: SwapStateT = this.swapState();
      return {
        ...state,
        isCurr: this.swapState().swap === idx,
      };
    });
}
