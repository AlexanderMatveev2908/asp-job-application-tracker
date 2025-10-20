import { SvgClsT, TxtClsT } from '@/common/types/css';
import { Nullable, SvgT } from '@/common/types/etc';
import { AppEventT } from '@/core/lib/dom/meta_event/etc/types';

export interface SpanPropsT {
  label: Nullable<string>;
  Svg: Nullable<SvgT>;
}

export interface SpanSizesPropsT {
  txt: TxtClsT;
  svg: SvgClsT;
}

export interface SpanEventPropsT extends SpanPropsT {
  eventT: AppEventT;
}
