import { SwapBoxT } from '@/core/directives/swap/use_dynamic_swap';
import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';

@Component({
  selector: 'app-form-field-box-lg',
  imports: [],
  templateUrl: './form-field-box-lg.html',
  styleUrl: './form-field-box-lg.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldBoxLg {
  public readonly f: InputSignal<SwapBoxT> = input.required();
}
