import { Directive, signal, WritableSignal } from '@angular/core';

@Directive()
export abstract class UseFocusDir {
  public readonly isFocused: WritableSignal<boolean> = signal(false);

  public onFocus: () => void = () => {
    this.isFocused.set(true);
  };

  public onBlur: () => void = () => {
    this.isFocused.set(false);
  };
}
