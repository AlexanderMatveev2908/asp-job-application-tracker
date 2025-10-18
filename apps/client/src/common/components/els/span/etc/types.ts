import { SvgClsT, TxtClsT } from '@/common/types/css';
import { Type } from '@angular/core';

export interface SpanPropsT {
  label: string | null;
  Svg: Type<unknown> | null;
}

export interface SpanSizesPropsT {
  txt: TxtClsT;
  svg: SvgClsT;
}
