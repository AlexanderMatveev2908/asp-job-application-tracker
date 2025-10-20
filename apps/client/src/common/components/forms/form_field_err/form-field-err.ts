import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  InputSignal,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { Tooltip } from '../../els/tooltip/tooltip';
import { FormControl } from '@angular/forms';
import { ErrsFieldT, RecErrsFieldT } from '@/common/types/forms';
import { UseFieldRootDir } from '@/core/directives/form_field/0.use_field_root';

@Component({
  selector: 'app-form-field-err',
  imports: [Tooltip],
  templateUrl: './form-field-err.html',
  styleUrl: './form-field-err.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldErr extends UseFieldRootDir implements OnInit {
  // ? personal props
  public readonly ctrl: InputSignal<FormControl> = input.required();
  // ? derived
  public recErrs: WritableSignal<RecErrsFieldT> = signal({
    prev: null,
    curr: null,
  });

  // ? ng
  ngOnInit(): void {
    this.setupWithCtrl(this.ctrl(), () => {
      effect(() => {
        const c: FormControl = this.ctrl();
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
