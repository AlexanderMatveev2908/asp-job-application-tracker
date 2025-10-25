import { Directive, Signal } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, Observable, startWith } from 'rxjs';
import { FormFieldTxt } from '@/common/components/forms/form_field_txt/form-field-txt';
import { UseInjCtxHk } from '@/core/hooks/use_inj_ctx';

@Directive({
  selector: '[appUseFormFieldDir]',
})
export class UseFormFieldDir extends UseInjCtxHk {
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
  public setupWithCtrl(ctrl: AbstractControl): void {
    const c: AbstractControl = ctrl;

    this.inCtx(() => {
      this.assignFields(c);
    });
  }

  public setupWithFieldRef(inst: FormFieldTxt): void {
    const c: AbstractControl = inst.ctrl();

    this.inCtx(() => {
      this.assignFields(c);
    });
  }
}
