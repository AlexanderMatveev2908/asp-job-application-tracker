import {
  AfterViewInit,
  Directive,
  HostListener,
  inject,
  signal,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import { UseHoverDir } from './0.use_hover';
import { UsePlatformSvc } from '../../hooks/use_platform';
import { RefDomT } from '@/common/types/etc';
import { PortalDOM, RecCoordsT } from '@/core/lib/dom/portal';

@Directive()
export abstract class UsePortalDir extends UseHoverDir implements AfterViewInit {
  // ? svc
  protected readonly usePlatform: UsePlatformSvc = inject(UsePlatformSvc);

  // ? local state
  public readonly coords: WritableSignal<RecCoordsT | null> = signal(null);

  // ? ref tooltip to calculate position wanted
  // ? relative to a certain element
  @ViewChild('tooltipRef') tooltipRef: RefDomT;

  // ? listeners
  ngAfterViewInit(): void {
    this.usePlatform.whenDomPainted(() => {
      this.coords.set(PortalDOM.coordsOfRef(this.tooltipRef));
    });
  }

  @HostListener('window:scroll')
  public onScroll(): void {
    this.coords.set(PortalDOM.coordsOfRef(this.tooltipRef));
  }
  @HostListener('window:resize')
  public onResize(): void {
    this.coords.set(PortalDOM.coordsOfRef(this.tooltipRef));
  }
}
