import { AfterViewInit, ChangeDetectionStrategy, Component } from '@angular/core';
import { SwapItem } from '@/common/components/swap/swap_item/swap-item';
import { TotpFormUiFkt, TotpPartFieldsT } from './etc/ui_fkt';
import { FormSubmit } from '@/common/components/forms/form_submit/form-submit';
import { UseIDsDir } from '@/core/directives/use_ids';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TotpFormMng } from './etc/paperwork/form_mng';
import { UseKitFormHk } from '@/core/hooks/kits/kit_form/0.use_kit_form';
import { EMPTY } from 'rxjs';
import { UseApiTrackerHk } from '@/core/store/api/etc/hooks/use_tracker';
import { UseInjCtxHk } from '@/core/hooks/use_inj_ctx';
import { FocusDOM } from '@/core/lib/dom/focus';

@Component({
  selector: 'app-totp-form',
  imports: [SwapItem, FormSubmit, UseIDsDir, ReactiveFormsModule],
  templateUrl: './totp-form.html',
  styleUrl: './totp-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UseApiTrackerHk, UseInjCtxHk],
})
export class TotpForm extends UseKitFormHk implements AfterViewInit {
  public readonly partsFields: TotpPartFieldsT[] = TotpFormUiFkt.partsFields();

  public readonly form: FormGroup = TotpFormMng.form();

  public readonly formCtrl: (outerIdx: number, innerIdx: number) => FormControl = (
    outerIdx: number,
    innerIdx: number
  ) => {
    const skip: number = outerIdx * (TotpFormUiFkt.nFields / TotpFormUiFkt.parts);

    return this.getCtrl(`totp.${skip + innerIdx}`);
  };

  public readonly onSubmit: () => void = () => {
    this.submitForm((data: unknown) => {
      console.log(data);

      return EMPTY;
    });
  };

  ngAfterViewInit(): void {
    this.useInjCtx.useDOM(() => {
      FocusDOM.byDataField('totp.0');
    });
  }
}
