import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  HostListener,
  OnInit,
  Signal,
} from '@angular/core';
import { SwapItem } from '@/common/components/swap/swap_item/swap-item';
import { TotpFormUiFkt, TotpPartFieldsT } from './etc/ui_fkt';
import { FormSubmit } from '@/common/components/forms/form_submit/form-submit';
import { UseIDsDir } from '@/core/directives/use_ids';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TotpFormMng, TotpFormT } from './etc/paperwork/form_mng';
import { UseKitFormHk } from '@/core/hooks/kits/kit_form/0.use_kit_form';
import { EMPTY } from 'rxjs';
import { UseApiTrackerHk } from '@/core/store/api/etc/hooks/use_tracker';
import { UseInjCtxHk } from '@/core/hooks/use_inj_ctx';
import { FocusDOM } from '@/core/lib/dom/focus';
import { FormFieldErr } from '@/common/components/forms/form_field_err/form-field-err';

import { TotpPart } from './totp_part/totp-part';
import { UseFormFieldDir } from '@/core/directives/forms/form_field/0.use_form_field';
import { Nullable } from '@/common/types/etc';
import { toSignal } from '@angular/core/rxjs-interop';
import { LibTotpFormMeta } from './etc/lib/metadata';

@Component({
  selector: 'app-totp-form',
  imports: [
    SwapItem,
    FormSubmit,
    UseIDsDir,
    ReactiveFormsModule,
    FormFieldErr,
    TotpPart,
    UseFormFieldDir,
  ],
  templateUrl: './totp-form.html',
  styleUrl: './totp-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UseApiTrackerHk, UseInjCtxHk],
})
export class TotpForm extends UseKitFormHk implements OnInit, AfterViewInit {
  public readonly partsFields: TotpPartFieldsT[] = TotpFormUiFkt.partsFields();

  public readonly form: FormGroup = TotpFormMng.form();

  public readonly formCtrl: (outerIdx: number, innerIdx: number) => FormControl = (
    outerIdx: number,
    innerIdx: number
  ) => this.getCtrl(`totp.${TotpFormUiFkt.skip(outerIdx) + innerIdx}`);

  public readonly onSubmit: () => void = () => {
    this.submitForm((data: unknown) => {
      console.log(data);

      return EMPTY;
    });
  };

  private formVal: Nullable<Signal<TotpFormT>> = null;

  ngOnInit(): void {
    this.useInjCtx.inCtx(() => {
      this.formVal = toSignal(this.form.valueChanges, {
        initialValue: this.form.value,
      });
    });
  }

  ngAfterViewInit(): void {
    this.useInjCtx.useDOM(() => {
      FocusDOM.byDataField('totp.0');
    });
  }

  @HostListener('document:keydown', ['$event'])
  public onKeysDown(e: KeyboardEvent): void {
    const val: Nullable<string[]> = this.formVal?.()?.totp ?? null;
    if (!val) return;

    const key: string = e.key;

    const { currFocus, currTotp, currIdx, allIn } = LibTotpFormMeta.main(val);

    // ! allIn check all value are:
    // ! number i where expected or truthy for DOM/strings
    if (!allIn) return;

    const ctrl: FormControl = this.getCtrl(currTotp!);

    if (key === 'Backspace') {
      ctrl.setValue('');
      FocusDOM.byDataField(`totp.${currIdx! - 1}`);
    }
  }
}
