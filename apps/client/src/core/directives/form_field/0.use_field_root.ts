import { Directive, inject, Signal } from '@angular/core';
import { UsePlatformSvc } from '../../hooks/use_platform';
import { AbstractControl } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, Observable, startWith } from 'rxjs';
import { FormFieldTxt } from '@/common/components/forms/form_field_txt/form-field-txt';
import { UseInjCtx } from '../use_inj_ctx';

@Directive()
export abstract class UseFieldRootDir extends UseInjCtx {
  // ? svc
  protected readonly usePlatform: UsePlatformSvc = inject(UsePlatformSvc);

  // ? derived
  public val!: Signal<unknown>;
  public interacted!: Signal<boolean>;

  // ? private helpers
  private assignFields(c: AbstractControl): void {
    this.val = toSignal(c.valueChanges as Observable<unknown>, {
      initialValue: c.value as unknown,
    });
    this.interacted = toSignal(
      c.statusChanges.pipe(
        map(() => !!(c.touched || c.dirty)),
        startWith(!!(c.touched || c.dirty))
      ),
      { initialValue: !!(c.touched || c.dirty) }
    );
  }

  // ? helpers
  protected setupWithCtrl(ctrl: AbstractControl, cb: () => void): void {
    const c: AbstractControl = ctrl;

    this.inCtx(() => {
      this.assignFields(c);

      cb();
    });
  }

  protected setupWithFieldRef(inst: FormFieldTxt, cb: () => void): void {
    const c: AbstractControl = inst.ctrl();

    this.inCtx(() => {
      this.assignFields(c);
    });

    cb();
  }
}
