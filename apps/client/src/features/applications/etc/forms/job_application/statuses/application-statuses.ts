import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';
import { DynamicSwapper } from '@/common/components/swap/dynamic_swapper/dynamic-swapper';
import { UseDynamicSwapHk } from '@/core/hooks/swap/use_dynamic_swap';
import { v4 } from 'uuid';
import { CheckBoxFieldT } from '@/common/types/forms';
import { UseIDsDir } from '@/core/directives/use_ids';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-application-statuses',
  imports: [DynamicSwapper, UseIDsDir],
  templateUrl: './application-statuses.html',
  styleUrl: './application-statuses.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicationStatuses extends UseDynamicSwapHk {
  public readonly ctrl: InputSignal<FormControl> = input.required();

  public readonly data: CheckBoxFieldT[] = Array.from(
    { length: 30 },
    (_: undefined, i: number) => ({
      label: i + '',
      val: i + '',
      id: v4(),
      field: '',
      name: '',
      type: 'checkbox',
    })
  );
}
