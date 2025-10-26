import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SwapItem } from '@/common/components/swap/swap_item/swap-item';

@Component({
  selector: 'app-bkp-form',
  imports: [SwapItem],
  templateUrl: './bkp-form.html',
  styleUrl: './bkp-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BkpForm {}
