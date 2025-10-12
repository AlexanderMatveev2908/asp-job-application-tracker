import { Type } from '@angular/core';
import { SvgFillInfo } from '../components/svgs/fill/info/info';
import { SvgFillError } from '../components/svgs/fill/error/error';
import { SvgFillCheck } from '../components/svgs/fill/check/check';

export type AppEventT = 'OK' | 'ERR' | 'WARN' | 'INFO';

export interface AppEventMeta {
  Svg: Type<unknown>;
  css: string;
  twd: string;
}

export const AppEvent: Record<AppEventT, AppEventMeta> = {
  OK: { Svg: SvgFillCheck, css: 'var(--green__600)', twd: 'text-green-600' },
  INFO: { Svg: SvgFillInfo, css: 'var(--blue__600)', twd: 'text-blue-600' },
  WARN: { Svg: SvgFillError, css: 'var(--yellow__600)', twd: 'text-yellow-600' },
  ERR: { Svg: SvgFillError, css: 'var(--red__600)', twd: 'text-red-600' },
};
