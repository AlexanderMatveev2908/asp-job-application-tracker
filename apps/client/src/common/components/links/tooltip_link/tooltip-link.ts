import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';
import { SpanLinkPropsT } from '../../els/span/etc/types';
import { NgComponentOutlet } from '@angular/common';
import { ArrowTooltipT, Tooltip } from '../../els/tooltip/tooltip';
import { UseHoverDir } from '@/core/directives/use_portal/0.use_hover';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tooltip-link',
  imports: [NgComponentOutlet, Tooltip, RouterLink],
  templateUrl: './tooltip-link.html',
  styleUrl: './tooltip-link.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TooltipLink extends UseHoverDir {
  public readonly lk: InputSignal<SpanLinkPropsT> = input.required();
  public readonly arrowOn: InputSignal<ArrowTooltipT> = input<ArrowTooltipT>('right');
}
