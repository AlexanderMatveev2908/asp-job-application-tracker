import { Type } from '@angular/core';

export type TxtInputT = 'text' | 'email' | 'password' | 'url';

export type CheckInputT = 'radio' | 'checkbox';

interface BaseFieldT {
  id: string;
  name: string;
  label: string;
}

export interface TxtFieldT extends BaseFieldT {
  type: TxtInputT;
  place: string;
}

export interface TxtSvgFieldT extends TxtFieldT {
  Svg: Type<unknown>;
}

export interface CheckFieldT extends BaseFieldT {
  type: CheckInputT;
}
