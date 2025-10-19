import {
  AfterViewInit,
  computed,
  Directive,
  effect,
  EffectRef,
  input,
  InputSignal,
  Signal,
} from '@angular/core';
import { ConfSwapT } from './with_swap/etc/types';
import { WithPortal } from './with_portal';

// | use WithPortal when sure curr component
// | will nt be used within a swap/slider
@Directive()
export abstract class WithSwapPortal extends WithPortal implements AfterViewInit {
  // ? optional props
  // | some els may be inside a slider
  // | which require dedicated attention
  public readonly confSwap: InputSignal<ConfSwapT | null> = input<ConfSwapT | null>(null);

  // ? derived
  public readonly showTooltip: Signal<boolean> = computed(
    () => !this.confSwap() || (!!this.confSwap()?.isCurr && this.confSwap()?.mode !== 'swapping')
  );

  // ? rerender
  public rerenderWhen: EffectRef = effect(() => {
    if (this.showTooltip()) this.coords.set(this.usePortal.coordsOf(this.tooltipRef));
  });
}
