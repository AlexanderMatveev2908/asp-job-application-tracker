import { ChangeDetectionStrategy, Component, Type } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { SvgFillPwdGen } from '@/common/components/svgs/fill/pwd_gen/pwd-gen';
import { Portal } from '@/layout/portal/portal';
import { WithSwapPortal } from '@/core/directives/with_swap_portal';
import { Tooltip } from '@/common/components/els/tooltip/tooltip';

@Component({
  selector: 'app-pwd-generator',
  imports: [NgComponentOutlet, Portal, Tooltip],
  templateUrl: './pwd-generator.html',
  styleUrl: './pwd-generator.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PwdGenerator extends WithSwapPortal {
  // ? static assets
  public readonly Svg: Type<unknown> = SvgFillPwdGen;
}
