import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  InputSignal,
  Signal,
} from '@angular/core';
import { NgClass } from '@angular/common';
import { TxtPropsT } from '../etc/types';

@Component({
  selector: 'app-txt-scroll',
  imports: [NgClass],
  templateUrl: './txt-scroll.html',
  styleUrl: './txt-scroll.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TxtScroll {
  public props: InputSignal<TxtPropsT> = input.required();

  public txtCls: Signal<string> = computed(() => `txt__${this.props().size}`);
}
