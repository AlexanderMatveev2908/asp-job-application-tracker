import { Directive, signal, WritableSignal } from '@angular/core';
import { UseInjCtx } from '../use_inj_ctx';

@Directive()
export abstract class UseHoverDir extends UseInjCtx {
  public readonly isHover: WritableSignal<boolean> = signal(false);

  public onHover(): void {
    this.isHover.set(true);
  }
  public onLeave(): void {
    this.isHover.set(false);
  }
}
