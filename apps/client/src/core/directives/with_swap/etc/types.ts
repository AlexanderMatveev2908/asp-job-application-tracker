export type SwapModeT = null | 'swapping' | 'swapped';

export interface SwapStateT {
  mode: SwapModeT;
  swap: number;
}

export interface ConfSwapT extends SwapStateT {
  isCurr: boolean;
}
