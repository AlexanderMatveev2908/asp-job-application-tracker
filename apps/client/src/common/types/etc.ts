export type GenericVoidT = void | Promise<void>;

export type GenericVoidCbT = (() => void) | (() => Promise<void>);

export interface IdPayloadT {
  id: string;
}
