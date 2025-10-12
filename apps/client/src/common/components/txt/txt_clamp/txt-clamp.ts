import { Component, computed, input } from '@angular/core';
import { TxtClsT } from '../../../types/txt';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-txt-clamp',
  imports: [NgClass],
  templateUrl: './txt-clamp.html',
  styleUrl: './txt-clamp.scss',
})
export class TxtClamp {
  public txt = input.required<string>();
  public size = input.required<TxtClsT>();
  public lines = input.required<number>();

  public txtCls = computed(() => `txt__${this.size()}`);
}
