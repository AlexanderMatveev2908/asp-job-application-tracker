/* eslint-disable no-magic-numbers */
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  HostListener,
  input,
  InputSignal,
  signal,
  WritableSignal,
} from '@angular/core';
import { SpanLinkPropsT } from '../../els/span/etc/types';
import { NgComponentOutlet } from '@angular/common';
import { ArrowTooltipT, Tooltip } from '../../els/tooltip/tooltip';
import { UseHoverSvc } from '@/core/hooks/listeners/use_hover';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tooltip-link',
  imports: [NgComponentOutlet, Tooltip, RouterLink],
  templateUrl: './tooltip-link.html',
  styleUrl: './tooltip-link.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TooltipLink extends UseHoverSvc implements AfterViewInit {
  public readonly lk: InputSignal<SpanLinkPropsT> = input.required();
  public readonly arrowOn: InputSignal<ArrowTooltipT> = input<ArrowTooltipT>('right');

  public readonly minW: WritableSignal<string> = signal('200px');

  private mngWidth(): void {
    const w: number = window?.innerWidth;
    if (!w) return;

    if (w > 1000) this.minW.set('350px');
    else if (w > 600) this.minW.set('300px');
    else this.minW.set('200px');
  }

  ngAfterViewInit(): void {
    this.mngWidth();
  }

  @HostListener('window:resize')
  public onResize(): void {
    this.mngWidth();
  }
}
