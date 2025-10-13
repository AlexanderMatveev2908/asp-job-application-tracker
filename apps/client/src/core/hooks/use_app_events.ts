import { SvgFillCheck } from '@/common/components/svgs/fill/check/check';
import { SvgFillError } from '@/common/components/svgs/fill/error/error';
import { SvgFillInfo } from '@/common/components/svgs/fill/info/info';
import { AppEventMeta, AppEventT } from '@/common/types/events';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UseAppEventsSvc {
  private readonly eventsData: Record<AppEventT, AppEventMeta> = {
    OK: {
      Svg: SvgFillCheck,
      clr: 'green__600',
      txtTwd: 'text-green-600',
      bdTwd: 'border-green-600',
      css: 'var(--green__600)',
    },
    INFO: {
      Svg: SvgFillInfo,
      clr: 'blue__600',
      txtTwd: 'text-blue-600',
      bdTwd: 'border-blue-600',
      css: 'var(--blue__600)',
    },
    WARN: {
      Svg: SvgFillError,
      clr: 'yellow__600',
      txtTwd: 'text-yellow-600',
      bdTwd: 'border-yellow-600',
      css: 'var(--yellow__600)',
    },
    ERR: {
      Svg: SvgFillError,
      clr: 'red__600',
      txtTwd: 'text-red-600',
      bdTwd: 'border-red-600',
      css: 'var(--red__600)',
    },
  };

  public getByT(e: AppEventT): AppEventMeta {
    return this.eventsData[e];
  }
}
