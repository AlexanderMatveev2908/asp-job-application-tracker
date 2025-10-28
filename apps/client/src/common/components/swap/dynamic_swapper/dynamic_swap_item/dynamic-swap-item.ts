import { FormFieldBoxLg } from '@/common/components/forms/form_field_box_lg/form-field-box-lg';
import { CheckBoxFieldT } from '@/common/types/forms';
import { PaginationSwapStateT } from '@/core/hooks/swap/etc/types';
import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';

@Component({
  selector: 'app-dynamic-swap-item',
  imports: [FormFieldBoxLg],
  templateUrl: './dynamic-swap-item.html',
  styleUrl: './dynamic-swap-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicSwapItem {
  // ? props
  public readonly fields: InputSignal<CheckBoxFieldT[]> = input.required();
  public readonly paginationState: InputSignal<Omit<PaginationSwapStateT, 'swapIDs'>> =
    input.required();
}
