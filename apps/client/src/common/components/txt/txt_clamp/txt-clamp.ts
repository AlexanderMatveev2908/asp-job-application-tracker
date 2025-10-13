import { Component, computed, input } from '@angular/core';
import { NgClass } from '@angular/common';
import { TxtClampConfT } from './etc/types';

@Component({
  selector: 'app-txt-clamp',
  imports: [NgClass],
  templateUrl: './txt-clamp.html',
  styleUrl: './txt-clamp.scss',
})
export class TxtClamp {
  public readonly conf = input.required<TxtClampConfT>();

  public txtCls = computed(() => `txt__${this.conf().size}`);
}
