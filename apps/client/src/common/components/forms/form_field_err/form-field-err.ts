import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  InputSignal,
  OnInit,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { Tooltip } from '../../els/tooltip/tooltip';
import { FormControl } from '@angular/forms';
import { ErrsFieldT, RecErrsFieldT } from '@/common/types/forms';
import { UseFieldRootDir } from '@/core/directives/form_field/0.use_field_root';
import { Prs } from '@/core/lib/data_structure/prs';

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
  public readonly testId: InputSignal<string> = input.required();
  // ? derived
  public recErrs: WritableSignal<RecErrsFieldT> = signal({
    prev: null,
    curr: null,
  });

  // ? props testid tooltip
  public readonly testIdErrMsg: Signal<string> = computed(() =>
    Prs.toSnake(`err__${this.testId()}`)
  );

  // ? ng
  ngOnInit(): void {
    this.setupWithCtrl(this.ctrl());

    this.useEffect(() => {
      const c: FormControl = this.ctrl();
      void this.val();

      const errors: ErrsFieldT = c.errors as ErrsFieldT;

      this.recErrs.update((prev: RecErrsFieldT) => ({
        prev: prev.curr,
        curr: errors?.zod && this.interacted() ? errors.zod : null,
      }));
    });
  }
}
