import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';
import { WrapBtnApiPropsT } from './etc/types';
import { SpinBtn } from '@/common/components/spins/spin_btn/spin-btn';

@Component({
  selector: 'app-wrap-btn-api',
  imports: [SpinBtn],
  templateUrl: './wrap-btn-api.html',
  styleUrl: './wrap-btn-api.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WrapBtnApi {
  public readonly props: InputSignal<WrapBtnApiPropsT> = input.required();
}
