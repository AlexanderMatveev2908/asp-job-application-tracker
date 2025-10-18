import { ErrsFieldT, RecErrsFieldT } from '@/common/types/forms';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
  InputSignal,
  OnInit,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { Tooltip } from '../../els/tooltip/tooltip';
import { FormControl } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, Observable, startWith } from 'rxjs';
import { UsePlatformSvc } from '@/core/hooks/use_platform';

@Component({
  selector: 'app-form-field-err',
  imports: [Tooltip],
  templateUrl: './form-field-err.html',
  styleUrl: './form-field-err.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldErr<T> implements OnInit {
  public readonly ctrl: InputSignal<FormControl<T>> = input.required();
  private readonly usePlatform: UsePlatformSvc = inject(UsePlatformSvc);

  public val!: Signal<string>;
  public interacted!: Signal<boolean>;
  public recErrs: WritableSignal<RecErrsFieldT> = signal({
    prev: null,
    curr: null,
  });

  ngOnInit(): void {
    const c = this.ctrl();

    this.usePlatform.inCtx(() => {
      this.val = toSignal(c.valueChanges as Observable<string>, {
        initialValue: c.value as string,
      });
      this.interacted = toSignal(
        c.statusChanges.pipe(
          map(() => !!(c.touched || c.dirty)),
          startWith(!!(c.touched || c.dirty))
        ),
        { initialValue: !!(c.touched || c.dirty) }
      );

      effect(() => {
        void this.val();

        const errors: ErrsFieldT = c.errors as ErrsFieldT;

        this.recErrs.update((prev: RecErrsFieldT) => ({
          prev: prev.curr,
          curr: errors?.zod && this.interacted() ? errors.zod : null,
        }));
      });
    });
  }
}
