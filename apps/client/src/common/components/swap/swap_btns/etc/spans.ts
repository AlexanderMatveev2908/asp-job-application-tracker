import { SvgStrokeLeft } from '@/common/components/svgs/stroke/left/left';
import { SvgStrokeRight } from '@/common/components/svgs/stroke/right/right';
import { SpanEventPropsT, WithIdT } from '@/common/types/etc';
import { RootUiCls } from '@/core/ui_factory/root_ui';

export class SpansSwap extends RootUiCls {
  private static readonly _spanProps: Partial<SpanEventPropsT> = {
    eventT: 'NONE',
    label: null,
  };

  public static getSpansProps(): (SpanEventPropsT & WithIdT)[] {
    return this.arrWithIDs(
      Array.from({ length: 2 }, (_: undefined, i: number) => ({
        ...this._spanProps,
        Svg: i ? SvgStrokeRight : SvgStrokeLeft,
      })) as SpanEventPropsT[]
    );
  }
}
