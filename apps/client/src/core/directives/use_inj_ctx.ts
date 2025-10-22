import {
  afterNextRender,
  Directive,
  effect,
  EffectCleanupRegisterFn,
  EnvironmentInjector,
  inject,
  runInInjectionContext,
} from '@angular/core';
import { UsePlatformSvc } from '../hooks/use_platform';

@Directive()
export abstract class UseInjCtx {
  protected readonly usePlatform: UsePlatformSvc = inject(UsePlatformSvc);
  protected readonly inj: EnvironmentInjector = inject(EnvironmentInjector);

  protected inCtx(cb: () => void): void {
    runInInjectionContext(this.inj, () => {
      cb();
    });
  }

  protected useEffect(cb: (onCleanup: EffectCleanupRegisterFn) => void): void {
    this.inCtx(() => {
      effect(cb, { injector: this.inj });
    });
  }

  public useDOM(cb: () => void): void {
    this.usePlatform.onClient(() => {
      this.inCtx(() => {
        afterNextRender(() => {
          requestAnimationFrame(() => cb());
        });
      });
    });
  }
}
