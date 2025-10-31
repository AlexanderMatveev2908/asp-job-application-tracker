import { SpanEventPropsT } from '@/common/components/els/span/etc/types';
import { SvgStrokeLeft } from '@/common/components/svgs/stroke/left/left';

export type PageCounterBlockChangeKeyT = 'prev' | 'next';

export class PageCounterUiFkt {
  private static readonly prev: SpanEventPropsT = {
    eventT: 'NONE',
    label: null,
    Svg: SvgStrokeLeft,
  };
  private static readonly next: SpanEventPropsT = {
    eventT: 'NONE',
    label: null,
    Svg: SvgStrokeLeft,
  };

  public static readonly btns: Record<PageCounterBlockChangeKeyT, SpanEventPropsT> = {
    prev: this.prev,
    next: this.next,
  };
}
