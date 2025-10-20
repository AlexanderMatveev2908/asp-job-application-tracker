import { ElementRef, TemplateRef, Type } from '@angular/core';

export type GenericVoidT = void | Promise<void>;

export type GenericVoidCbT = (() => void) | (() => Promise<void>);

export type GenericObjT = Record<string, unknown> | null;

export interface WithIdT {
  id: string;
}

export type RefDomT = ElementRef<HTMLElement> | undefined;

export type TpltRedT = TemplateRef<unknown>;

export type SvgT = Type<unknown>;

export type ElDomT = HTMLElement | None;

export interface BtnStatePropsT {
  isPending: boolean;
  isDisabled: boolean;
}

export type None = null | undefined;

export interface BtnListenersT {
  onClick: (() => void) | (() => Promise<void>);
}

export type BtnT = 'button' | 'submit';

export type OptCbT = ((val: unknown) => void) | null;
