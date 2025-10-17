import { EnvironmentInjector, inject, Injectable, runInInjectionContext } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UseDiCtxSvc {
  private readonly injector: EnvironmentInjector = inject(EnvironmentInjector);

  public inCtx(cb: () => void): void {
    runInInjectionContext(this.injector, () => {
      cb();
    });
  }
}
