import { Component, computed, input } from '@angular/core';
import { NgClass } from '@angular/common';
import { TxtPropsT } from '../etc/types';

@Component({
  selector: 'app-txt-scroll',
  imports: [NgClass],
  templateUrl: './txt-scroll.html',
  styleUrl: './txt-scroll.scss',
})
export class TxtScroll {
  public props = input.required<TxtPropsT>();

  public txtCls = computed<string>(() => `txt__${this.props().size}`);
}
