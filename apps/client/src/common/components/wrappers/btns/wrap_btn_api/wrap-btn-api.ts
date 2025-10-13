import { Component, input } from '@angular/core';
import { WrapBtnApiPropsT } from './etc/types';
import { SpinBtn } from '@/common/components/spins/spin_btn/spin-btn';

@Component({
  selector: 'app-wrap-btn-api',
  imports: [SpinBtn],
  templateUrl: './wrap-btn-api.html',
  styleUrl: './wrap-btn-api.scss',
})
export class WrapBtnApi {
  public readonly props = input.required<WrapBtnApiPropsT>();
}
