import { ElementRef, TemplateRef, Type } from '@angular/core';

export type GenericVoidT = void | Promise<void>;

export type GenericVoidCbT = (() => void) | (() => Promise<void>);

export type GenericObjT = Nullable<Record<string, unknown>>;

export interface WithIdT {
  id: string;
}

// ? make components accepts always
// ? a testId assigning it then based on needs
export interface WithTestIdT {
  testId: Nullable<string>;
}

export type RefDomT = Opt<ElementRef<HTMLElement>>;

export type TpltRedT = TemplateRef<unknown>;

export type SvgT = Type<unknown>;

export type ElDomT = HTMLElement | None;

export interface BtnStatePropsT {
  isPending: boolean;
  isDisabled: boolean;
}

export type None = null | undefined;

export type OrNone<T> = T | None;

export type Nullable<T> = T | null;

export type Opt<T> = T | undefined;

export type TimerIdT = Nullable<NodeJS.Timeout>;

export interface BtnListenersT {
  onClick: (() => void) | (() => Promise<void>);
}

export type BtnT = 'button' | 'submit';

export type OptCbT = Nullable<(val: unknown) => void>;
