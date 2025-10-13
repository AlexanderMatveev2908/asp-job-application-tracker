import { NgComponentOutlet } from '@angular/common';
import { Component, input } from '@angular/core';
import { PairTxtSvgPropsT } from './etc/types';

@Component({
  selector: 'app-pair-txt-svg',
  imports: [NgComponentOutlet],
  templateUrl: './pair-txt-svg.html',
  styleUrl: './pair-txt-svg.scss',
})
export class PairTxtSvg {
  public readonly props = input.required<PairTxtSvgPropsT>();
}
