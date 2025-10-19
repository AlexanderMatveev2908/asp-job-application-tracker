import { ElementRef } from '@angular/core';

export type GenericVoidT = void | Promise<void>;

export type GenericVoidCbT = (() => void) | (() => Promise<void>);

export type GenericObjT = Record<string, unknown> | null;

export interface WithIdT {
  id: string;
}

export type RefDomT = ElementRef<HTMLElement> | undefined;

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

export type OptCb = ((val: unknown) => void) | null;
