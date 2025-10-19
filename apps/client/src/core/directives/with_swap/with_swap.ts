import { computed, Directive, Signal, signal, WritableSignal } from '@angular/core';
import { ConfSwapT, SwapStateT } from './etc/types';
import { LibEtc } from '@/core/lib/etc';
import { FocusDOM } from '@/core/lib/dom/focus';

@Directive()
export abstract class WithSwap {
  // ? local state
  public readonly swapState: WritableSignal<SwapStateT> = signal({
    mode: 'idle',
    swap: 0,
  });

  protected timerID: NodeJS.Timeout | null = null;

  // ? private helpers
  protected clearTmr(): void {
    this.timerID = LibEtc.clearTmrID(this.timerID);
  }

  protected focusWhen(...kwargs: string[]): void {
    const { swap, mode } = this.swapState();
    if (mode === 'swapped') FocusDOM.focusWhen(kwargs, swap);
  }

  // ? listeners
  public readonly setSwap: (val: number) => void = (val: number) => {
    // | added little margin 100ms
    // | normal tim would be 400
    const TIME_ANIMATION: number = 500;
    this.clearTmr();

    this.swapState.update((prev: SwapStateT) => ({ ...prev, mode: 'swapping', swap: val }));

    this.timerID = setTimeout(() => {
      if (this.timerID && this.swapState().mode === 'swapping')
        this.swapState.update((prev: SwapStateT) => ({ ...prev, mode: 'swapped' }));

      this.clearTmr();
    }, TIME_ANIMATION);
  };

  // ? derived
  public readonly confSwap: (idx: number) => Signal<ConfSwapT> = (idx: number) =>
    computed(() => {
      const state: SwapStateT = this.swapState();
      return {
        ...state,
        isCurr: this.swapState().swap === idx,
      };
    });
}
