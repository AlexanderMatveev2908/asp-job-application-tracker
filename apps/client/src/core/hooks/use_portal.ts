import { ElDomT, RefDomT } from '@/common/types/etc';
import { Injectable, Signal, signal, WritableSignal } from '@angular/core';

export interface RecCoordsT {
  top: string | null;
  left: string | null;
  right: string | null;
  bottom: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class UsePortalSvc {
  private readonly _coords: WritableSignal<RecCoordsT | null> = signal(null);
  public readonly rec: Signal<RecCoordsT | null> = this._coords.asReadonly();

  public coordsOf(refDom: RefDomT): void {
    const elDOM: ElDomT = refDom?.nativeElement;
    if (!elDOM) return;

    const coordsDOM: DOMRect = elDOM.getBoundingClientRect();

    this._coords.set({
      top: `${coordsDOM.top}px`,
      left: `${coordsDOM.right - coordsDOM.width}px`,
      right: `${coordsDOM.left}px`,
      bottom: `${window.innerHeight - coordsDOM.bottom}px`,
    });
  }
}
