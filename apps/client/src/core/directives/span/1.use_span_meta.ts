import { AppEventMetaT } from '@/core/lib/dom/meta_event/etc/types';
import { MetaEventDOM } from '@/core/lib/dom/meta_event/meta_event';
import { computed, Directive, input, InputSignal, Signal } from '@angular/core';
import { UseSpanRootDir } from './0.use_span_root';

@Directive()
export abstract class UseMetaSpanDir extends UseSpanRootDir {
  public readonly paddingProps: InputSignal<string> = input('10px 15px');

  public readonly metaEvent: Signal<AppEventMetaT> = computed(() =>
    MetaEventDOM.byT(this.spanProps().eventT)
  );
}
