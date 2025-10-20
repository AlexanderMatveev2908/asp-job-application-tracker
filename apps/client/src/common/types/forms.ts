import { ValidationErrors } from '@angular/forms';
import { SvgT } from './etc';

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
  Svg: SvgT;
}

export interface CheckFieldT extends BaseFieldT {
  type: CheckInputT;
}
