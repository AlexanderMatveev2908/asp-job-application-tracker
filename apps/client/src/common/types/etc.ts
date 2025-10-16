import { ElementRef } from '@angular/core';

export type GenericVoidT = void | Promise<void>;

export type GenericVoidCbT = (() => void) | (() => Promise<void>);

export type GenericObjT = Record<string, unknown> | null;

export interface IdPayloadT {
  id: string;
}

export type RefDomT = ElementRef<HTMLElement> | undefined;

export type ElDomT = HTMLElement | undefined;
