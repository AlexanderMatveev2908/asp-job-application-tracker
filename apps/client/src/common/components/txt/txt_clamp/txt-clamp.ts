import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  InputSignal,
  Signal,
} from '@angular/core';
import { NgClass } from '@angular/common';
import { TxtClampPropsT } from './etc/types';

@Component({
  selector: 'app-txt-clamp',
  imports: [NgClass],
  templateUrl: './txt-clamp.html',
  styleUrl: './txt-clamp.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TxtClamp {
  public readonly props: InputSignal<TxtClampPropsT> = input.required();

  public txtCls: Signal<string> = computed(() => `txt__${this.props().size}`);
}
