import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  EffectRef,
  input,
  InputSignal,
  Signal,
  Type,
} from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { SvgFillPwdGen } from '@/common/components/svgs/fill/pwd_gen/pwd-gen';
import { Portal } from '@/layout/portal/portal';
import { WithTooltip } from '@/core/directives/with_tooltip';
import { Tooltip } from '@/common/components/els/tooltip/tooltip';
import { ConfSwapT } from '@/core/directives/with_swap/etc/types';

@Component({
  selector: 'app-pwd-generator',
  imports: [NgComponentOutlet, Portal, Tooltip],
  templateUrl: './pwd-generator.html',
  styleUrl: './pwd-generator.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PwdGenerator extends WithTooltip {
  // ? personal optional props
  // ? component may be inside a swapper which needs rerender options
  public readonly confSwap: InputSignal<ConfSwapT | null> = input<ConfSwapT | null>(null);

  // ? static assets
  public readonly Svg: Type<unknown> = SvgFillPwdGen;

  // ? derived
  public readonly showTooltip: Signal<boolean> = computed(
    () => !this.confSwap() || (!!this.confSwap()?.isCurr && this.confSwap()?.mode === 'swapped')
  );

  // ? rerender
  public optDependencies: EffectRef = effect(() => {
    void this.confSwap();

    if (this.showTooltip()) this.coords.set(this.usePortal.coordsOf(this.tooltipRef));
  });
}
