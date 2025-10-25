import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';
import { UseApiTrackerHk } from '@/core/store/api/etc/hooks/use_tracker';
import { UseKitPairPwdFormHk } from '@/core/forms/pair_pwd/etc/hooks/use_kit_pair_pwd';
import { FormPairPwd } from '@/core/forms/pair_pwd/form-pair-pwd';
import { Observable, of } from 'rxjs';
import { ConfSwapT } from '@/core/hooks/use_swap/etc/types';
import { UseKitStrategyDir } from '@/core/directives/forms/kits/0.use_kit_strategy';

@Component({
  selector: 'app-change-pwd-form',
  imports: [FormPairPwd, UseKitStrategyDir],
  templateUrl: './change-pwd-form.html',
  styleUrl: './change-pwd-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UseApiTrackerHk],
})
export class ChangePwdForm extends UseKitPairPwdFormHk {
  public readonly confSwap: InputSignal<ConfSwapT> = input.required();

  public readonly strategy: (data: unknown) => Observable<unknown> = (data: unknown) => {
    console.log(data);

    return of(data);
  };
}
