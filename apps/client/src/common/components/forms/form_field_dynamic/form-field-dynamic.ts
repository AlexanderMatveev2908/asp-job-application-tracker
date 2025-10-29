import { TxtFieldArrayT } from '@/common/types/forms';
import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';

@Component({
  selector: 'app-form-field-dynamic',
  imports: [],
  templateUrl: './form-field-dynamic.html',
  styleUrl: './form-field-dynamic.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldDynamic {
  public readonly f: InputSignal<TxtFieldArrayT> = input.required();

  public readonly hideLabel: InputSignal<boolean> = input(false);
}
