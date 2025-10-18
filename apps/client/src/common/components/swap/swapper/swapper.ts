import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  InputSignal,
  Signal,
} from '@angular/core';
import { SwapBtns } from './swap_btns/swap-btns';

@Component({
  selector: 'app-swapper',
  imports: [SwapBtns],
  templateUrl: './swapper.html',
  styleUrl: './swapper.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Swapper {
  public readonly swap: InputSignal<number> = input.required();
  public readonly setSwap: InputSignal<(val: number) => void> = input.required();
  public readonly maxSwaps: InputSignal<number> = input.required();

  // eslint-disable-next-line no-magic-numbers
  public readonly transform: Signal<string> = computed(() => `-${this.swap() * 100}%`);
}
