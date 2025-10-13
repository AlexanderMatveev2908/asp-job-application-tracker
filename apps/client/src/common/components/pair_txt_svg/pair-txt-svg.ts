import { NgComponentOutlet } from '@angular/common';
import { Component, input } from '@angular/core';
import { PairTxtSvgConfT } from './etc/types';

@Component({
  selector: 'app-pair-txt-svg',
  imports: [NgComponentOutlet],
  templateUrl: './pair-txt-svg.html',
  styleUrl: './pair-txt-svg.scss',
})
export class PairTxtSvg {
  public readonly conf = input.required<PairTxtSvgConfT>();
}
