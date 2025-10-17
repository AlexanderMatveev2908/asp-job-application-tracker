import { Type } from '@angular/core';

export type AppEventT = 'OK' | 'NONE' | 'ERR' | 'WARN' | 'INFO';

export interface AppEventMetaT {
  Svg: Type<unknown>;
  css: string;
  txtTwd: string;
  bdTwd: string;
  clr: string;
}

export interface AppEventPayloadT {
  status: number;
  msg: string;
  eventT: AppEventT;
}
