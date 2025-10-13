import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';
import { BlackBgConfT } from './etc/types';

@Component({
  selector: 'app-black-bg',
  imports: [NgClass],
  templateUrl: './black-bg.html',
  styleUrl: './black-bg.scss',
})
export class BlackBg {
  public conf = input.required<BlackBgConfT>();
}
