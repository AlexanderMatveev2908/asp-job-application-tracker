import { SpanEventPropsT, SpanSizesPropsT } from '@/common/components/els/span/etc/types';
import { Nullable } from '@/common/types/etc';
import { AppEventMetaT } from '@/core/lib/dom/meta_event/etc/types';
import { MetaEventDOM } from '@/core/lib/dom/meta_event/meta_event';
import { computed, Directive, input, InputSignal, Signal } from '@angular/core';

@Directive()
export abstract class UseSpanDir {
  public readonly spanProps: InputSignal<SpanEventPropsT> = input.required();
  public readonly spanSizesProps: InputSignal<Partial<SpanSizesPropsT>> = input<
    Partial<SpanSizesPropsT>
  >({
    svg: 'sm',
    txt: 'lg',
  });
  public readonly paddingProps: InputSignal<string> = input('10px 15px');
  public readonly testId: InputSignal<Nullable<string>> = input<Nullable<string>>(null);

  // ? derived from eventT span props
  public readonly metaEvent: Signal<AppEventMetaT> = computed(() =>
    MetaEventDOM.byT(this.spanProps().eventT)
  );
}
