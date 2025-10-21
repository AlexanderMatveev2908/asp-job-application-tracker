import { Directive, input, InputSignal } from '@angular/core';
import { UseTestIdDir } from '../use_test_id';
import { SpanEventPropsT, SpanSizesPropsT } from '@/common/components/els/span/etc/types';

@Directive()
export abstract class UseSpanRootDir extends UseTestIdDir {
  public readonly spanProps: InputSignal<SpanEventPropsT> = input.required();
  public readonly spanSizesProps: InputSignal<Partial<SpanSizesPropsT>> = input<
    Partial<SpanSizesPropsT>
  >({
    svg: 'sm',
    txt: 'lg',
  });
}
