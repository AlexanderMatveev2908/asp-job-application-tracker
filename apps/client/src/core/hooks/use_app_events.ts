import { Injectable } from '@angular/core';
import { SvgFillCheck } from '../../common/components/svgs/fill/check/check';
import { SvgFillError } from '../../common/components/svgs/fill/error/error';
import { SvgFillInfo } from '../../common/components/svgs/fill/info/info';
import { AppEventMeta, AppEventT } from '../../common/types/events';

@Injectable({
  providedIn: 'root',
})
export class UseAppEventsSvc {
  private readonly eventsData: Record<AppEventT, AppEventMeta> = {
    OK: { Svg: SvgFillCheck, css: 'var(--green__600)', twd: 'text-green-600' },
    INFO: { Svg: SvgFillInfo, css: 'var(--blue__600)', twd: 'text-blue-600' },
    WARN: { Svg: SvgFillError, css: 'var(--yellow__600)', twd: 'text-yellow-600' },
    ERR: { Svg: SvgFillError, css: 'var(--red__600)', twd: 'text-red-600' },
  };

  public getByT(e: AppEventT): AppEventMeta {
    return this.eventsData[e];
  }
}
