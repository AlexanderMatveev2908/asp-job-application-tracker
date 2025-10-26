import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  ContentChildren,
  effect,
  EffectRef,
  HostListener,
  input,
  InputSignal,
  QueryList,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { SwapBtns } from './swap_btns/swap-btns';
import { ElDomT, Nullable, Opt, RefDomT } from '@/common/types/etc';
import { ErrApp } from '@/core/lib/err';
import { UseInjCtxHk } from '@/core/hooks/use_inj_ctx';

@Component({
  selector: 'app-swapper',
  imports: [SwapBtns],
  templateUrl: './swapper.html',
  styleUrl: './swapper.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Swapper extends UseInjCtxHk implements AfterViewInit {
  // ? personal props
  public readonly swap: InputSignal<number> = input.required();
  public readonly setSwap: InputSignal<(val: number) => void> = input.required();
  public readonly maxSwaps: InputSignal<number> = input.required();
  public readonly prefixTestId: InputSignal<string> = input.required();

  // ? derived by content
  public readonly maxH: WritableSignal<Nullable<string>> = signal(null);

  // ? derived
  // eslint-disable-next-line no-magic-numbers
  public readonly transform: Signal<string> = computed(() => `-${this.swap() * 100}%`);
  public readonly swapperID: Signal<string> = computed(() => `${this.prefixTestId()}__swapper`);

  // ? projected
  @ContentChildren('swapDiv', { descendants: false })
  private readonly projectedEls: Opt<QueryList<RefDomT>>;

  // ? helper
  private calcH(): void {
    if (!this.projectedEls) return;

    const maxSwaps: number = this.maxSwaps();

    const swapDivDOM: HTMLElement[] = this.projectedEls
      .map((el: RefDomT) => el?.nativeElement)
      .filter((el: ElDomT) => !!el && el?.tagName === 'DIV') as HTMLElement[];

    if (swapDivDOM.length !== maxSwaps)
      throw new ErrApp(`expected ${maxSwaps} divs, received ${swapDivDOM}`);

    let idx: number = 0;

    do {
      if (idx !== this.swap()) {
        idx++;
        continue;
      }

      const curr: HTMLElement = swapDivDOM[idx];
      this.maxH.set(`${curr.scrollHeight}px`);
      break;
    } while (idx < maxSwaps);
  }

  // ? listener
  ngAfterViewInit(): void {
    this.useDOM(() => {
      this.calcH();
    });
  }

  public onSwapChange: EffectRef = effect(() => {
    void this.swap();

    setTimeout(() => {
      this.calcH();
    }, 0);
  });

  @HostListener('window:resize')
  public onResize(): void {
    this.calcH();
  }
}
