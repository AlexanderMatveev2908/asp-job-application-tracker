import { Directive, inject, input, InputSignal, Signal } from '@angular/core';
import { UsePlatformSvc } from '../../hooks/use_platform';
import { FormControl } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, Observable, startWith } from 'rxjs';

@Directive()
export abstract class UseFieldRoot {
  // ? svc
  protected readonly usePlatform: UsePlatformSvc = inject(UsePlatformSvc);

  // ? props
  public readonly ctrl: InputSignal<FormControl<unknown>> = input.required();

  // ? derived
  public val!: Signal<unknown>;
  public interacted!: Signal<boolean>;

  // ? helpers
  protected setup(cb: () => void): void {
    const c = this.ctrl();

    this.usePlatform.inCtx(() => {
      this.val = toSignal(c.valueChanges as Observable<boolean | null>, {
        initialValue: c.value as boolean | null,
      });
      this.interacted = toSignal(
        c.statusChanges.pipe(
          map(() => !!(c.touched || c.dirty)),
          startWith(!!(c.touched || c.dirty))
        ),
        { initialValue: !!(c.touched || c.dirty) }
      );

      cb();
    });
  }
}
