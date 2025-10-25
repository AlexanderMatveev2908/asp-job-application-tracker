import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';
import { ApiTrackerSvc } from '@/core/store/api/etc/tracker';
import { UseKitPairPwdFormSvc } from '@/core/forms/pair_pwd/etc/use_kit_pair_pwd';
import { FormPairPwd } from '@/core/forms/pair_pwd/form-pair-pwd';
import { PairPwdFormT } from '@/core/forms/pair_pwd/etc/paperwork/form_mng';
import { Observable, of } from 'rxjs';
import { ConfSwapT } from '@/core/hooks/use_swap/etc/types';

@Component({
  selector: 'app-change-pwd-form',
  imports: [FormPairPwd],
  templateUrl: './change-pwd-form.html',
  styleUrl: './change-pwd-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ApiTrackerSvc],
})
export class ChangePwdForm extends UseKitPairPwdFormSvc {
  public readonly confSwap: InputSignal<ConfSwapT> = input.required();

  public readonly strategy: (data: PairPwdFormT) => Observable<unknown> = (data: PairPwdFormT) => {
    console.log(data);

    return of(data);
  };
}
