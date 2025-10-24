import {
  afterNextRender,
  effect,
  EffectCleanupRegisterFn,
  EnvironmentInjector,
  inject,
  Injectable,
  runInInjectionContext,
} from '@angular/core';
import { UsePlatformSvc } from './use_platform';

@Injectable()
export abstract class UseInjCtxSvc {
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

  protected useDOM(cb: () => void): void {
    this.usePlatform.onClient(() => {
      this.inCtx(() => {
        afterNextRender(() => {
          requestAnimationFrame(() => cb());
        });
      });
    });
  }
}
