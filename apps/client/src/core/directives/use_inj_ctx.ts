import { Directive, EnvironmentInjector, inject, runInInjectionContext } from '@angular/core';

@Directive()
export abstract class UseInjCtx {
  protected readonly inj: EnvironmentInjector = inject(EnvironmentInjector);

  protected inCtx(cb: () => void): void {
    runInInjectionContext(this.inj, () => {
      cb();
    });
  }
}
