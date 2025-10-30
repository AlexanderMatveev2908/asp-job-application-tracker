import { UseHoverHk } from '@/core/hooks/listeners/use_hover';
import { NgComponentOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input, InputSignal } from '@angular/core';
import { UseIDsDir } from '@/core/directives/use_ids';
import { Tooltip } from '../../els/tooltip/tooltip';
import { UseSpanDir } from '@/core/directives/use_span';

@Component({
  selector: 'app-btn-tooltip',
  imports: [NgComponentOutlet, UseIDsDir, Tooltip],
  templateUrl: './btn-tooltip.html',
  styleUrl: './btn-tooltip.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UseHoverHk],
})
export class BtnTooltip {
  // ? directives
  public readonly useIDsDir: UseIDsDir = inject(UseIDsDir);
  public readonly useSpanDir: UseSpanDir = inject(UseSpanDir);

  // ? hooks
  public readonly useHover: UseHoverHk = inject(UseHoverHk);

  // ? props
  public readonly onClick: InputSignal<() => void> = input.required();
}
