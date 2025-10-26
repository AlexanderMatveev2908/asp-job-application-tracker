import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CsrWithTitle } from '@/common/components/hoc/page/csr_with_title/csr-with-title';
import { Swapper } from '@/common/components/swap/swapper/swapper';
import { UseSwapHk } from '@/core/hooks/use_swap/use_swap';
import { TotpForm } from './swaps/totp_form/totp-form';
import { BkpForm } from './swaps/bkp_form/bkp-form';

@Component({
  selector: 'app-form-2fa',
  imports: [CsrWithTitle, Swapper, TotpForm, BkpForm],
  templateUrl: './form-2fa.html',
  styleUrl: './form-2fa.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Form2fa extends UseSwapHk {}
