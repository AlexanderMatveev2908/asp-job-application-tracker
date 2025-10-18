import { ElementRef } from '@angular/core';

export type GenericVoidT = void | Promise<void>;

export type GenericVoidCbT = (() => void) | (() => Promise<void>);

export type GenericObjT = Record<string, unknown> | null;

export interface WithIdT {
  id: string;
}

export type RefDomT = ElementRef<HTMLElement> | undefined;

export type ElDomT = HTMLElement | null | undefined;

export interface BtnStatePropsT {
  isPending: boolean;
  isDisabled: boolean;
}

export interface BtnListenersT {
  onClick: (() => void) | (() => Promise<void>);
}

export type BtnT = 'button' | 'submit';
