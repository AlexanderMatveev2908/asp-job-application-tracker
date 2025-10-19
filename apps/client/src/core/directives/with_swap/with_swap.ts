import { computed, Directive, Signal, signal, WritableSignal } from '@angular/core';
import { ConfSwapT, SwapModeT, SwapStateT } from './etc/types';
import { LibEtc } from '@/core/lib/etc';
import { FocusDOM } from '@/core/lib/dom/focus';

@Directive()
export abstract class WithSwap {
  // | added little margin 100ms
  // | normal tim would be 400
  // eslint-disable-next-line no-magic-numbers
  public static readonly TIME_ANIMATION: number = 500;

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
  private readonly _setSwap: (val: number, onEndSwap: SwapModeT) => void = (
    val: number,
    onEndSwap: SwapModeT
  ) => {
    this.clearTmr();

    this.swapState.update((prev: SwapStateT) => ({ ...prev, mode: 'swapping', swap: val }));

    this.timerID = setTimeout(() => {
      if (this.timerID && this.swapState().mode === 'swapping')
        this.swapState.update((prev: SwapStateT) => ({ ...prev, mode: onEndSwap }));

      this.clearTmr();
    }, WithSwap.TIME_ANIMATION);
  };
  // ? listeners
  public readonly setSwap: (val: number) => void = (val: number) => {
    this._setSwap(val, 'swapped');
  };
  protected readonly setSwapOnErr: (val: number) => void = (val: number) => {
    this._setSwap(val, 'idle');
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
