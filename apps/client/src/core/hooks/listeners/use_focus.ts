import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable()
export abstract class UseFocusSvc {
  public readonly isFocused: WritableSignal<boolean> = signal(false);

  public onFocus: () => void = () => {
    this.isFocused.set(true);
  };

  public onBlur: () => void = () => {
    this.isFocused.set(false);
  };
}
