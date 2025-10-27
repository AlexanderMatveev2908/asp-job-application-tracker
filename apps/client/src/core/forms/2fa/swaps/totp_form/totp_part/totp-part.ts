import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';
import { TotpPartFieldsT } from '../etc/ui_fkt';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

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
}
