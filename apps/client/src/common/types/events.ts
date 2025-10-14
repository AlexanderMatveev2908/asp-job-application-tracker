import { Type } from '@angular/core';

export type AppEventT = 'OK' | 'NONE' | 'ERR' | 'WARN' | 'INFO';

export interface AppEventMeta {
  Svg: Type<unknown>;
  css: string;
  txtTwd: string;
  bdTwd: string;
  clr: string;
}

export interface AppEventPayload {
  status: number;
  msg: string;
  eventT: AppEventT;
}
