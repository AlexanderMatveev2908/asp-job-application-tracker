import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SwapItem } from '@/common/components/swap/swap_item/swap-item';
import { TotpFormUiFkt, TotpPartFieldsT } from './etc/ui_fkt';

@Component({
  selector: 'app-totp-form',
  imports: [SwapItem],
  templateUrl: './totp-form.html',
  styleUrl: './totp-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TotpForm {
  public readonly partsFields: TotpPartFieldsT[] = TotpFormUiFkt.partsFields();
}
