import { SvgClsT, TxtClsT } from '@/common/types/css';
import { AppEventT } from '@/core/hooks/use_event_meta/etc/types';
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
