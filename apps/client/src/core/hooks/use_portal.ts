import { ElDomT, RefDomT } from '@/common/types/etc';
import { Injectable } from '@angular/core';

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
  public coordsOf(refDom: RefDomT): RecCoordsT | null {
    const elDOM: ElDomT = refDom?.nativeElement;
    if (!elDOM) return null;

    const coordsDOM: DOMRect = elDOM.getBoundingClientRect();

    return {
      top: `${coordsDOM.top}px`,
      left: `${coordsDOM.right - coordsDOM.width}px`,
      right: `${coordsDOM.left}px`,
      bottom: `${window.innerHeight - coordsDOM.bottom}px`,
    };
  }
}
