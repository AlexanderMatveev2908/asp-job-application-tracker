import { Directive, signal, WritableSignal } from '@angular/core';

@Directive()
export abstract class UseHoverDir {
  public readonly isHover: WritableSignal<boolean> = signal(false);

  public onHover(): void {
    this.isHover.set(true);
  }
  public onLeave(): void {
    this.isHover.set(false);
  }
}
