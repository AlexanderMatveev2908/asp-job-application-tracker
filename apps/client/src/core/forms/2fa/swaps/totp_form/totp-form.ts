import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SwapItem } from '@/common/components/swap/swap_item/swap-item';

@Component({
  selector: 'app-totp-form',
  imports: [SwapItem],
  templateUrl: './totp-form.html',
  styleUrl: './totp-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TotpForm {}
