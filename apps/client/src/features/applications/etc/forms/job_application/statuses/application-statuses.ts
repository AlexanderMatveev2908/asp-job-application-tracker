import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';
import { DynamicSwapper } from '@/common/components/swap/dynamic_swapper/dynamic-swapper';

@Component({
  selector: 'app-application-statuses',
  imports: [DynamicSwapper],
  templateUrl: './application-statuses.html',
  styleUrl: './application-statuses.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicationStatuses {
  public readonly label: InputSignal<string> = input.required();
}
