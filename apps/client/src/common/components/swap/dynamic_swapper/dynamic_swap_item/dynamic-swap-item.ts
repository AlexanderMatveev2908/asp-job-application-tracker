import { CheckBoxFieldT } from '@/common/types/forms';
import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';

@Component({
  selector: 'app-dynamic-swap-item',
  imports: [],
  templateUrl: './dynamic-swap-item.html',
  styleUrl: './dynamic-swap-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicSwapItem {
  public readonly fields: InputSignal<CheckBoxFieldT[]> = input.required();
}
