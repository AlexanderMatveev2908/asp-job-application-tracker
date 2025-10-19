import {
  AfterViewInit,
  Directive,
  HostListener,
  inject,
  signal,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import { RecCoordsT, UsePortalSvc } from '../hooks/use_portal';
import { UsePlatformSvc } from '../hooks/use_platform';
import { RefDomT } from '@/common/types/etc';

@Directive()
export abstract class WithTooltip implements AfterViewInit {
  // ? svc
  protected readonly usePortal: UsePortalSvc = inject(UsePortalSvc);
  protected readonly usePlatform: UsePlatformSvc = inject(UsePlatformSvc);

  // ? local state
  public readonly coords: WritableSignal<RecCoordsT | null> = signal(null);
  public readonly isHover: WritableSignal<boolean> = signal(false);

  // ? ref tooltip to calculate position wanted
  @ViewChild('tooltipRef') tooltipRef: RefDomT;

  // ? listeners
  public onHover(): void {
    this.isHover.set(true);
  }
  public onLeave(): void {
    this.isHover.set(false);
  }

  ngAfterViewInit(): void {
    this.usePlatform.whenDomPainted(() => {
      this.coords.set(this.usePortal.coordsOf(this.tooltipRef));
    });
  }

  @HostListener('window:scroll')
  public onScroll(): void {
    this.coords.set(this.usePortal.coordsOf(this.tooltipRef));
  }
}
