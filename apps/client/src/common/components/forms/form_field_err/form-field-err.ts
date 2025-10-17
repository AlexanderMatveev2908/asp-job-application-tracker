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
import { UseDiCtxSvc } from '@/core/hooks/use_di_ctx';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-form-field-err',
  imports: [Tooltip],
  templateUrl: './form-field-err.html',
  styleUrl: './form-field-err.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldErr<T> implements OnInit {
  public readonly ctrl: InputSignal<FormControl<T>> = input.required();
  private readonly useDiCtx: UseDiCtxSvc = inject(UseDiCtxSvc);

  public val!: Signal<string>;
  public recErrs: WritableSignal<RecErrsFieldT> = signal({
    prev: null,
    curr: null,
  });

  ngOnInit(): void {
    const c = this.ctrl();

    this.useDiCtx.inCtx(() => {
      this.val = toSignal(c.valueChanges as Observable<string>, {
        initialValue: c.value as string,
      });

      effect(() => {
        void this.val();

        const wasInteraction: boolean = c.touched || c.dirty;

        const errors: ErrsFieldT = c.errors as ErrsFieldT;

        this.recErrs.update((prev: RecErrsFieldT) => ({
          prev: prev.curr,
          curr: errors?.zod && wasInteraction ? errors.zod : null,
        }));
      });
    });
  }
}
