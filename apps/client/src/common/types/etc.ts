export type GenericVoidT = void | Promise<void>;

export type GenericVoidCbT = (() => void) | (() => Promise<void>);

export type GenericObjT = Record<string, unknown> | null;

export interface IdPayloadT {
  id: string;
}
