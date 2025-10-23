import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';
import { PairPwd } from '@/common/components/hoc/pair_pwd/pair-pwd';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-pair-pwd',
  imports: [PairPwd],
  templateUrl: './form-pair-pwd.html',
  styleUrl: './form-pair-pwd.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormPairPwd {
  public readonly getCtrl: InputSignal<(key: string) => FormControl> = input.required();
}
