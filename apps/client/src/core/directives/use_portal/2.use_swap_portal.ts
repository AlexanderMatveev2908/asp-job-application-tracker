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
import { ConfSwapT } from '../use_swap/etc/types';
import { UsePortalDir } from './1.use_portal';
import { PortalDOM } from '@/core/lib/dom/portal';

// | use WithPortal when sure curr component
// | will nt be used within a swap/slider
@Directive()
export abstract class UseSwapPortalDir extends UsePortalDir implements AfterViewInit {
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
    if (this.showTooltip()) this.coords.set(PortalDOM.coordsOfRef(this.tooltipRef));
  });
}
