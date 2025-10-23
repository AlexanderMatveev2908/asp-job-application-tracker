import { Directive, HostListener, signal, ViewChild, WritableSignal } from '@angular/core';
import { UseHoverSvc } from '../../hooks/listeners/use_hover';
import { Nullable, RefDomT } from '@/common/types/etc';
import { PortalDOM, RecCoordsT } from '@/core/lib/dom/portal';

@Directive()
export abstract class UsePortalDir extends UseHoverSvc {
  // ? local state
  public readonly coords: WritableSignal<Nullable<RecCoordsT>> = signal(null);

  // ? ref tooltip to calculate position wanted
  // ? relative to a certain element
  @ViewChild('tooltipRef') tooltipRef: RefDomT;

  // ? listeners
  protected readonly setCoords: () => void = () => {
    this.coords.set(PortalDOM.coordsOfRef(this.tooltipRef));
  };

  @HostListener('window:scroll')
  public onScroll(): void {
    this.setCoords();
  }
  @HostListener('window:resize')
  public onResize(): void {
    this.setCoords();
  }
}
