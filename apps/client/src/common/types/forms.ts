import { Type } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

export type TxtInputT = 'text' | 'email' | 'password' | 'url';
export type CheckInputT = 'radio' | 'checkbox';

export interface RecErrsFieldT {
  prev: string | null;
  curr: string | null;
}
export type ErrsFieldT = ValidationErrors & { zod: string | null };

export interface PairPwdStateT {
  isPwdTypePwd: boolean;
  isConfirmPwdTypePwd: boolean;
}

interface BaseFieldT {
  id: string;
  name: string;
  field: string;
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
