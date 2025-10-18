import { AppEventT } from '@/core/hooks/use_event_meta/etc/types';
import { ElementRef } from '@angular/core';
import { SpanPropsT } from '../components/els/span/etc/types';

export type GenericVoidT = void | Promise<void>;

export type GenericVoidCbT = (() => void) | (() => Promise<void>);

export type GenericObjT = Record<string, unknown> | null;

export interface WithIdT {
  id: string;
}

export type RefDomT = ElementRef<HTMLElement> | undefined;

export type ElDomT = HTMLElement | null | undefined;

export interface SpanEventPropsT extends SpanPropsT {
  eventT: AppEventT;
}

export interface BtnStatePropsT {
  isPending: boolean;
  isDisabled: boolean;
}

export interface BtnListenersT {
  onClick: (() => void) | (() => Promise<void>);
}

export type BtnT = 'button' | 'submit';
