import { SvgFillCheck } from '@/common/components/svgs/fill/check/check';
import { SvgFillError } from '@/common/components/svgs/fill/error/error';
import { SvgFillInfo } from '@/common/components/svgs/fill/info/info';
import { AppEvMeta, AppEvT } from '@/common/types/events';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UseAppEvSvc {
  private readonly eventsData: Record<AppEvT, AppEvMeta> = {
    OK: {
      Svg: SvgFillCheck,
      clr: 'green__600',
      txtTwd: 'text-green-600',
      bdTwd: 'border-green-600',
      css: 'var(--green__600)',
    },
    NONE: {
      Svg: SvgFillCheck,
      clr: 'gray__300',
      txtTwd: 'text-gray-300',
      bdTwd: 'border-gray-300',
      css: 'var(--gray__300)',
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

  public getByT(e: AppEvT): AppEvMeta {
    return this.eventsData[e];
  }
}
