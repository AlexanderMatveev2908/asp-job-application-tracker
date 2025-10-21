import { TxtPropsT } from '@/common/components/els/txt/etc/types';
import { computed, Directive, input, InputSignal, Signal } from '@angular/core';

@Directive()
export abstract class UseTxtDir {
  public props: InputSignal<TxtPropsT> = input.required();

  public txtCls: Signal<string> = computed(() => `txt__${this.props().size}`);
}
