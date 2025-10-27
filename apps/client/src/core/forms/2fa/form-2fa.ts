import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  input,
  InputSignal,
} from '@angular/core';
import { CsrWithTitle } from '@/common/components/hoc/page/csr_with_title/csr-with-title';
import { Swapper } from '@/common/components/swap/swapper/swapper';
import { UseSwapHk } from '@/core/hooks/use_swap/use_swap';
import { TotpForm } from './swaps/totp_form/totp-form';
import { BkpForm } from './swaps/bkp_form/bkp-form';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-form-2fa',
  imports: [CsrWithTitle, Swapper, TotpForm, BkpForm],
  templateUrl: './form-2fa.html',
  styleUrl: './form-2fa.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Form2fa extends UseSwapHk implements AfterViewInit {
  public readonly strategy: InputSignal<(totpOrBkp: string) => Observable<unknown>> =
    input.required();

  ngAfterViewInit(): void {
    this.useEffect(() => {
      this.focusWhen('totp.0', 'bkp');
    });
  }
}
