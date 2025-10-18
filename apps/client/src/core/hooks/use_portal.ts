import { RefDomT } from '@/common/types/etc';
import { Injectable } from '@angular/core';

export interface RecCoordsT {}

@Injectable({
  providedIn: 'root',
})
export class UsePortalSvc {
  public coordsOf(refDom: RefDomT): RecCoordsT {}
}
