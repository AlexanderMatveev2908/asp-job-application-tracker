import { NgComponentOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';
import { PairTxtSvgPropsT } from './etc/types';

@Component({
  selector: 'app-pair-txt-svg',
  imports: [NgComponentOutlet],
  templateUrl: './pair-txt-svg.html',
  styleUrl: './pair-txt-svg.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PairTxtSvg {
  public readonly props: InputSignal<PairTxtSvgPropsT> = input.required();
}
