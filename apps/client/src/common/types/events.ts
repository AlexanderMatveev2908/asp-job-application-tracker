import { Type } from '@angular/core';

export type AppEventT = 'OK' | 'ERR' | 'WARN' | 'INFO';

export interface AppEventMeta {
  Svg: Type<unknown>;
  css: string;
  txtTwd: string;
  bdTwd: string;
  clr: string;
}
