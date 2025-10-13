import { Component, computed, input } from '@angular/core';
import { NgClass } from '@angular/common';
import { TxtClampPropsT } from './etc/types';

@Component({
  selector: 'app-txt-clamp',
  imports: [NgClass],
  templateUrl: './txt-clamp.html',
  styleUrl: './txt-clamp.scss',
})
export class TxtClamp {
  public readonly props = input.required<TxtClampPropsT>();

  public txtCls = computed<string>(() => `txt__${this.props().size}`);
}
