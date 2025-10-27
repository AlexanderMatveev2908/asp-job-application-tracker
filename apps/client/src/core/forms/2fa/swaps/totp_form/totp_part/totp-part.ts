import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';
import { TotpFormUiFkt, TotpPartFieldsT } from '../etc/ui_fkt';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Reg } from '@/core/paperwork/reg';
import { FocusDOM } from '@/core/lib/dom/focus';

@Component({
  selector: 'app-totp-part',
  imports: [ReactiveFormsModule],
  templateUrl: './totp-part.html',
  styleUrl: './totp-part.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TotpPart {
  public readonly part: InputSignal<TotpPartFieldsT> = input.required();
  public readonly outerIdx: InputSignal<number> = input.required();
  public readonly formCtrl: InputSignal<(outerIdx: number, innerIdx: number) => FormControl> =
    input.required();

  public onChange(e: Event, outerIdx: number, innerIdx: number): void {
    const input: HTMLInputElement = e.target as HTMLInputElement;

    if (Reg.isInt(input.value)) {
      const nextIdx: number = TotpFormUiFkt.skip(outerIdx) + innerIdx + 1;
      if (nextIdx > TotpFormUiFkt.nFields) return;

      const nextBox: string = `totp.${nextIdx}`;
      FocusDOM.byDataField(nextBox);
      return;
    }

    const ctrl: FormControl = this.formCtrl()(outerIdx, innerIdx);
    ctrl.setValue('');
  }
}
