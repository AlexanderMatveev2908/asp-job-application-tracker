import { TxtFieldT } from '@/common/types/forms';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
  InputSignal,
  OnInit,
  Signal,
} from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { UseDiCtxSvc } from '@/core/hooks/use_di_ctx';
import { Observable } from 'rxjs';
import { Log } from '@/core/lib/log';

@Component({
  selector: 'app-form-field-txt',
  imports: [ReactiveFormsModule],
  templateUrl: './form-field-txt.html',
  styleUrl: './form-field-txt.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldTxt implements OnInit {
  public readonly ctrl: InputSignal<FormControl<unknown>> = input.required();
  public readonly f: InputSignal<TxtFieldT> = input.required();
  private readonly useDiCtx: UseDiCtxSvc = inject(UseDiCtxSvc);

  public val!: Signal<string>;

  ngOnInit(): void {
    const c = this.ctrl();

    this.useDiCtx.inCtx(() => {
      this.val = toSignal(c.valueChanges as Observable<string>, {
        initialValue: c.value as string,
      });

      effect(() => {
        void this.val();
        Log.log(c.errors);
      });
    });
  }
}
