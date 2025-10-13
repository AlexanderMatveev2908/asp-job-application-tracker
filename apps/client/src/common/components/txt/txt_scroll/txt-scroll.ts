import { Component, computed, input } from '@angular/core';
import { NgClass } from '@angular/common';
import { TxtConfT } from '../etc/types';

@Component({
  selector: 'app-txt-scroll',
  imports: [NgClass],
  templateUrl: './txt-scroll.html',
  styleUrl: './txt-scroll.scss',
})
export class TxtScroll {
  public conf = input.required<TxtConfT>();

  public txtCls = computed(() => `txt__${this.conf().size}`);
}
