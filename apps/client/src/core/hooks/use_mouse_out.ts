import { ElDomT, RefDomT } from '@/common/types/etc';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UseMouseOutSvc {
  public onMouseOut(el: RefDomT, e: MouseEvent, cb: () => void): void {
    const elDOM: ElDomT = el?.nativeElement;
    const target: HTMLElement = e.target as HTMLElement;
    if (!elDOM) return;

    if (!elDOM.contains(target)) cb();
  }
}
