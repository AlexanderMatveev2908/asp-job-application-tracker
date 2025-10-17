export interface BtnStatePropsT {
  isPending: boolean;
  isDisabled: boolean;
}

export interface BtnEvPropsT {
  onClick: (() => void) | (() => Promise<void>);
}

export type BtnT = 'button' | 'submit';
