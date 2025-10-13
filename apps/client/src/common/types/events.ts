import { Type } from '@angular/core';

export type AppEvT = 'OK' | 'ERR' | 'WARN' | 'INFO';

export interface AppEvMeta {
  Svg: Type<unknown>;
  css: string;
  txtTwd: string;
  bdTwd: string;
  clr: string;
}
