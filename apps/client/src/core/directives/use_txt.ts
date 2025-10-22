import { TxtPropsT } from '@/common/components/els/txt/etc/types';
import { computed, Directive, input, InputSignal, Signal } from '@angular/core';

@Directive()
export abstract class UseTxtDir {
  public readonly props: InputSignal<TxtPropsT> = input.required();

  public readonly txtCls: Signal<string> = computed(() => `txt__${this.props().size}`);
}
