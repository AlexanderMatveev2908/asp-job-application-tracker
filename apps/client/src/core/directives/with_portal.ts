import {
  AfterViewInit,
  Directive,
  HostListener,
  inject,
  signal,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import { WithHover } from './with_hover';
import { RecCoordsT, UsePortal } from '../hooks/use_portal';
import { UsePlatformSvc } from '../hooks/use_platform';
import { RefDomT } from '@/common/types/etc';

@Directive()
export abstract class WithPortal extends WithHover implements AfterViewInit {
  // ? svc
  protected readonly usePlatform: UsePlatformSvc = inject(UsePlatformSvc);

  // ? local state
  public readonly coords: WritableSignal<RecCoordsT | null> = signal(null);

  // ? ref tooltip to calculate position wanted
  @ViewChild('tooltipRef') tooltipRef: RefDomT;

  // ? listeners
  ngAfterViewInit(): void {
    this.usePlatform.whenDomPainted(() => {
      this.coords.set(UsePortal.coordsOf(this.tooltipRef));
    });
  }

  @HostListener('window:scroll')
  public onScroll(): void {
    this.coords.set(UsePortal.coordsOf(this.tooltipRef));
  }
}
