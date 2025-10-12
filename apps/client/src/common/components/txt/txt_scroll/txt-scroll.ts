import { Component, computed, input } from '@angular/core';
import { TxtClsT } from '../../../types/txt';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-txt-scroll',
  imports: [NgClass],
  templateUrl: './txt-scroll.html',
  styleUrl: './txt-scroll.scss',
})
export class TxtScroll {
  public txt = input.required<string>();
  public size = input.required<TxtClsT>();

  public txtCls = computed(() => `txt__${this.size()}`);
}
