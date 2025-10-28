import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';
import { DynamicSwapper } from '@/common/components/swap/dynamic_swapper/dynamic-swapper';
import { UseDynamicSwapHk } from '@/core/hooks/swap/use_dynamic_swap';
import { SwapBoxT } from '@/core/directives/swap/use_dynamic_swap';
import { v4 } from 'uuid';

@Component({
  selector: 'app-application-statuses',
  imports: [DynamicSwapper],
  templateUrl: './application-statuses.html',
  styleUrl: './application-statuses.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicationStatuses extends UseDynamicSwapHk {
  public readonly label: InputSignal<string> = input.required();

  public readonly data: SwapBoxT[] = Array.from({ length: 30 }, (_: undefined, i: number) => ({
    label: i + '',
    val: i + '',
    id: v4(),
  }));
}
