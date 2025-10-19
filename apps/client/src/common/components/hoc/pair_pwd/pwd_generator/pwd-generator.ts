import {
  ChangeDetectionStrategy,
  Component,
  effect,
  EffectRef,
  input,
  InputSignal,
  Type,
} from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { SvgFillPwdGen } from '@/common/components/svgs/fill/pwd_gen/pwd-gen';
import { Portal } from '@/layout/portal/portal';
import { WithTooltip } from '@/core/directives/with_tooltip';
import { Tooltip } from '@/common/components/els/tooltip/tooltip';

@Component({
  selector: 'app-pwd-generator',
  imports: [NgComponentOutlet, Portal, Tooltip],
  templateUrl: './pwd-generator.html',
  styleUrl: './pwd-generator.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PwdGenerator extends WithTooltip {
  // ? personal optional props
  // ? component may be inside a swapper
  // ? but not necessarily so by default will always receive
  // ? by parent a 0
  public readonly swap: InputSignal<number> = input(0);

  // ? static assets
  public readonly Svg: Type<unknown> = SvgFillPwdGen;

  public optDependencies: EffectRef = effect(() => {
    const TIME_ANIMATION: number = 500;
    void this.swap();

    setTimeout(() => {
      this.coords.set(this.usePortal.coordsOf(this.tooltipRef));
    }, TIME_ANIMATION);
  });
}
