import { UseDynamicSwapDir } from '@/core/directives/swap/use_dynamic_swap';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormFieldBoxLg } from '../../forms/form_field_box_lg/form-field-box-lg';

@Component({
  selector: 'app-dynamic-swapper',
  imports: [FormFieldBoxLg],
  templateUrl: './dynamic-swapper.html',
  styleUrl: './dynamic-swapper.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicSwapper extends UseDynamicSwapDir {}
