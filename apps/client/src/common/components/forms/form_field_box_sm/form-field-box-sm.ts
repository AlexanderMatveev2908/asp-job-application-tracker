import { CheckFieldT } from '@/common/types/forms';
import { UseFieldRoot } from '@/core/directives/form_fields/0.use_field_root';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  InputSignal,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-form-field-box-sm',
  imports: [],
  templateUrl: './form-field-box-sm.html',
  styleUrl: './form-field-box-sm.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldBoxSm extends UseFieldRoot implements OnInit {
  // ? personal props required
  public readonly f: InputSignal<CheckFieldT> = input.required();

  ngOnInit(): void {
    this.setup(() => {
      effect(() => {
        void this.val();

        console.log(this.val());
      });
    });
  }
}
