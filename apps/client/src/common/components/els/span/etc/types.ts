import { SvgClsT, TxtClsT } from '@/common/types/css';
import { AppEventT } from '@/core/lib/dom/meta_event/etc/types';
import { Type } from '@angular/core';

export interface SpanPropsT {
  label: string | null;
  Svg: Type<unknown> | null;
}

export interface SpanSizesPropsT {
  txt: TxtClsT;
  svg: SvgClsT;
}

export interface SpanEventPropsT extends SpanPropsT {
  eventT: AppEventT;
}
