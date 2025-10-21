import { Injectable, signal, WritableSignal } from '@angular/core';
import { UseInjCtx } from '../../directives/use_inj_ctx';

@Injectable()
export abstract class UseHoverSvc extends UseInjCtx {
  public readonly isHover: WritableSignal<boolean> = signal(false);

  public onHover(): void {
    this.isHover.set(true);
  }
  public onLeave(): void {
    this.isHover.set(false);
  }
}
