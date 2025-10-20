import { SvgClsT, TxtClsT } from '@/common/types/css';
import { SvgT } from '@/common/types/etc';
import { AppEventT } from '@/core/lib/dom/meta_event/etc/types';

export interface SpanPropsT {
  label: string | null;
  Svg: SvgT | null;
}

export interface SpanSizesPropsT {
  txt: TxtClsT;
  svg: SvgClsT;
}

export interface SpanEventPropsT extends SpanPropsT {
  eventT: AppEventT;
}
