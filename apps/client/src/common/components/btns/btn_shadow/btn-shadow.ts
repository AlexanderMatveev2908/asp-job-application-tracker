import { Component, input } from '@angular/core';
import { PairTxtSvg } from '../../pair_txt_svg/pair-txt-svg';
import { BtnShadowConfT } from './etc/types';

@Component({
  selector: 'app-btn-shadow',
  imports: [PairTxtSvg],
  templateUrl: './btn-shadow.html',
  styleUrl: './btn-shadow.scss',
})
export class BtnShadow {
  public readonly conf = input.required<BtnShadowConfT>();
}
